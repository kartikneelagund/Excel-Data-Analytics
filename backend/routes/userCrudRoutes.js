const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST add user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: "User added", newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PUT update user and mark as "edited"
router.put("/:id", async (req, res) => {
  try {
    // remove incoming status if sent accidentally
    const { status, ...rest } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        status: "edited", // FORCE status to "edited"
      },
      { new: true }
    );

    res.send({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


// Permanently delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User permanently deleted", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});




router.put("/:id", async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if any values are different
    const isChanged =
      existingUser.firstName !== req.body.firstName ||
      existingUser.lastName !== req.body.lastName ||
      existingUser.email !== req.body.email;

    if (!isChanged) {
      return res.status(200).send({ message: "No changes detected" });
    }

    // Update with status: "edited" if changes found
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status: "edited" },
      { new: true }
    );

    res.send({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});







module.exports = router;
