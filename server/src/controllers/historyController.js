import { Report, AnalysisHistory } from '../config/db.js';

export const getHistory = async (req, res) => {
  try {
    const history = await Report.find({ userId: req.user.id });
    // Sort descending by date (createdAt is string)
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json(history);
  } catch (err) {
    console.error("Fetch history error:", err);
    return res.status(500).json({ error: 'Internal server error retrieving history.' });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findOne({ id, userId: req.user.id });
    if (!report) {
      return res.status(404).json({ error: 'Analysis report not found.' });
    }

    return res.status(200).json(report);
  } catch (err) {
    console.error("Fetch report error:", err);
    return res.status(500).json({ error: 'Internal server error retrieving report.' });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReport = await Report.deleteOne({ id, userId: req.user.id });
    await AnalysisHistory.deleteOne({ reportId: id, userId: req.user.id });

    return res.status(200).json({ success: true, message: 'Report deleted successfully.' });
  } catch (err) {
    console.error("Delete report error:", err);
    return res.status(500).json({ error: 'Internal server error deleting report.' });
  }
};
