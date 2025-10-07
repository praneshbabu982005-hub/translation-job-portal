const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

// Get all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});


// Post a new job (admin only)
router.post('/', auth, requireRole('admin'), async (req, res) => {
  const job = new Job({ ...req.body, postedBy: req.user.userId });
  await job.save();
  res.status(201).json(job);
});



// Apply for a job (user)
router.post('/:id/apply', async (req, res) => {
  const { id } = req.params;
  const { name, email, coverLetter } = req.body;
  const job = await Job.findById(id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  job.applicants.push({ name, email, coverLetter });
  await job.save();
  // Email notification to admin and user
  try {
    const User = require('../models/User');
    const { sendMail } = require('../utils/mailer');
    const admin = await User.findOne({ role: 'admin' });
    if (admin && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendMail({
        to: admin.email,
        subject: `New Application for ${job.title}`,
        text: `Name: ${name}\nEmail: ${email}\nCover Letter: ${coverLetter}`
      });
    }
    // Send confirmation to user
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendMail({
        to: email,
        subject: `Application Received for ${job.title}`,
        text: `Dear ${name},\n\nYour application for the position '${job.title}' at ${job.company} has been received.\n\nThank you for applying!\n\n- Translation Job Portal Team`
      });
    }
  } catch (e) { /* ignore email errors */ }
  res.status(201).json({ message: 'Application submitted' });
});

// Get applicants for a job (admin only)
router.get('/:id/applicants', auth, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job.applicants);
});

module.exports = router;
