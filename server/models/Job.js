const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  postedBy: String,
  applicants: [
    {
      name: String,
      email: String,
      coverLetter: String,
      appliedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
