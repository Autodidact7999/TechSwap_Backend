import multer from 'multer';

// Set up multer for file upload
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // limit to 5MB
  }
});

export default upload;