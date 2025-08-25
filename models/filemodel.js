import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileURL: { type: String, required: true },
  uploader: { type: String, required: true },
  downloadId: { type: String, required: true, unique: true },
  expiryTime: { type: Date, required: true },
  downloadCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("File", fileSchema);
