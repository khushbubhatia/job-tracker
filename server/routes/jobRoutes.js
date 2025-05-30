const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Apply auth middleware to all routes
router.use(authMiddleware);

// ✅ Create a new job (with userId)
router.post('/', async (req, res) => {
  try {
    const job = new Job({ ...req.body, userId: req.user.userId });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all jobs for the logged-in user
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.userId }).sort({ dateApplied: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a job (only if it belongs to the user)
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!job) return res.status(404).json({ error: 'Job not found or unauthorized' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete a job (only if it belongs to the user)
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!job) return res.status(404).json({ error: 'Job not found or unauthorized' });
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
