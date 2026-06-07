const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items (with optional search)
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const items = await Item.find({
      name: { $regex: search, $options: 'i' }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH restock item
router.patch('/:id/restock', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $inc: { stock: req.body.quantity } },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

