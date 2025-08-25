export const uploadFile = async(req, res)=>{
  try {
    res.json({
      message: 'File uploaded successfully',
      url: req.file.path 
    });
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};