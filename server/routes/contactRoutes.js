const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// POST: create new contact message
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET: fetch all contact messages (for admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// DELETE: delete a contact message by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
