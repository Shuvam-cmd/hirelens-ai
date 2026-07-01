import express from 'express';
import { getHistory, getReportById, deleteReport } from '../controllers/historyController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, getHistory);
router.get('/:id', requireAuth, getReportById);
router.delete('/:id', requireAuth, deleteReport);

export default router;
