// routes/userscrud.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // adjust path as needed

//  GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // returns all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to soft-delete user
router.put('/delete/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Delete error', error: err.message });
  }
});

module.exports = router;
