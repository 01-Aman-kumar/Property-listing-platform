const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const auth = require('../middleware/auth');


// GET /api/properties
router.get('/', async (req, res) => {
  try {
    const { search, location: loc, minPrice, maxPrice } = req.query;
    const filter = {};

    // If 'search' provided -> check both title and location
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // If explicit location param provided (stronger match)
    if (loc) {
      filter.location = { $regex: loc, $options: 'i' };
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// GET /api/properties/:id
router.get('/:id', async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/properties (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // In real app validate req.user role
    const { title, price, location, image, description } = req.body;
    if (!title || !price || !location) {
      return res.status(400).json({ message: 'All required fields missing' });
    }
    const prop = new Property({ title, price, location, image, description });
    await prop.save();
    res.status(201).json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router;
