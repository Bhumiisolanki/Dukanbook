const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customerId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false },
  items: [
    {
      itemId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      name:     String,
      price:    Number,
      quantity: Number
    }
  ],
  total:       { type: Number, required: true },
  paymentType: { type: String, enum: ['cash', 'khata'], required: true },
  date:        { type: Date, default: Date.now }
});

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);