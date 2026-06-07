const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  price:         { type: Number, required: true },
  stock:         { type: Number, required: true },
  lowStockAlert: { type: Number, default: 5 }
});

module.exports = mongoose.models.Item || mongoose.model('Item', itemSchema);