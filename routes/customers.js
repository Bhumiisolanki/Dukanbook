const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH record payment (reduce balance)
router.patch('/:id/pay', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    customer.totalBalance -= req.body.amount;
    if (customer.totalBalance < 0) customer.totalBalance = 0;
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;