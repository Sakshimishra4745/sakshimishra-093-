import File from "../models/filemodel.js";
import cloudinary from "../config/cloudinary.js";
import { sendDownloadLink } from "../utils/emailservice.js";
import crypto from "crypto";


export const uploadFile = async (req, res) => {
  try {
    const uploader = req.body.email;
    const file = req.file; 

    const result = await cloudinary.uploader.upload(file.path);

    const fileDoc = await File.create({
      fileURL: result.secure_url,
      expiryTime: Date.now() + 60 * 60 * 1000, 
      uploader,
      downloadCount: 0,
      downloadId: crypto.randomBytes(16).toString("hex"),
    });

    const downloadLink = `${process.env.BASE_URL}/download/${fileDoc.downloadId}`;
    await sendDownloadLink(uploader, downloadLink);

    res.status(201).json({ message: "File uploaded", link: downloadLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const fileDoc = await File.findOne({ downloadId: id });

    if (!fileDoc) return res.status(404).json({ message: "File not found" });

    if (Date.now() > fileDoc.expiryTime) {
      return res.status(410).json({ message: "Link expired" });
    }

    fileDoc.downloadCount += 1;
    await fileDoc.save();

    res.status(200).json({ fileURL: fileDoc.fileURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Download failed" });
  }
};
