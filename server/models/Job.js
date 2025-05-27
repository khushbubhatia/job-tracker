const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Rejected', 'Offered'],
    default: 'Applied',
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
  link: {
    type: String,
  }
});

module.exports = mongoose.model('Job', jobSchema);
