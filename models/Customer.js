const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  phone:        { type: String, default: '' },
  totalBalance: { type: Number, default: 0 }
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);