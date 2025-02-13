import Tour from '../models/tour.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const acceptedTypes = /jpeg|jpg|png|doc|docx|pdf/;

const fileFilter = (req, { originalname }, cb) => {
  const extension = path.extname(originalname).toLowerCase();
  if (acceptedTypes.test(extension)) cb(null, true);
  else cb(new Error('File extension not allowed'));
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, `./uploads/`);
  },
  filename: async (req, { originalname }, cb) => {
    const extension = path.extname(originalname).toLowerCase();
    cb(null, Buffer.from(originalname, 'latin1').toString('utf8'));
  },
});

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3145728 },
}).single('file');

export default {
  uploader,
  async uploadFile({ body: { id }, file }, res) {
    if (!file) return res.status(400).json({ message: 'File is undefined' });
    if (!id) return res.status(400).json({ message: 'Tour ID is undefined' });
    
    const filepath = file.size > 1024 * 1024 * 1.5 
      ? `uploads/compressed/${file.filename}` 
      : `uploads/${file.filename}`;

    const tour = await Tour.findByPk(id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    
    try {
      const data = fs.readFileSync(filepath);
      const base64Image = data.toString('base64');
      await tour.update({ image: base64Image });
      
      res.json({ filePath: filepath, base64Image });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Error reading file' });
    }
  },
};
