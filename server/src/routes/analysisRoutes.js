import express from 'express';
import multer from 'multer';
import { analyzeResume } from '../controllers/analysisController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Configure Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are supported!'), false);
    }
  }
});

// Post request to upload resume and job description for parsing
router.post('/analyze', requireAuth, upload.single('resume'), analyzeResume);

export default router;
