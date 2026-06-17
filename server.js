const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/items', require('./routes/items'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/transactions', require('./routes/transactions'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dukanbook')
  .then(() => {
    console.log('MongoDB connected ✅');
    app.listen(3000, () => console.log('Server running on http://localhost:3000 🚀'));
  })
  .catch(err => console.log('DB Error:', err));