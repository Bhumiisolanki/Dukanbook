const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Item = require('../models/item');
const Customer = require('../models/Customer');

router.get('/', async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const transactions = await Transaction.find({ date: { $gte: start } })
      .populate('customerId', 'name');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { customerId, items, paymentType } = req.body;

    // Calculate total
    let total = 0;
    for (let i of items) {
      total += i.price * i.quantity;
    }

    // Decrease stock
    for (let i of items) {
      await Item.findByIdAndUpdate(i.itemId, { $inc: { stock: -i.quantity } });
    }

    // If khata, update customer balance
    if (paymentType === 'khata' && customerId) {
      await Customer.findByIdAndUpdate(customerId, { $inc: { totalBalance: total } });
    }

    // Save transaction — customerId optional for cash
    const txnData = { items, total, paymentType };
    if (paymentType === 'khata' && customerId) txnData.customerId = customerId;

    const transaction = new Transaction(txnData);
    await transaction.save();

    res.json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;