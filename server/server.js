// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobRoutes');
const dashboardRoute = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoute);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);

// Root route (just for testing)
app.get('/', (req, res) => {
  res.send('Job Tracker API is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

// Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));