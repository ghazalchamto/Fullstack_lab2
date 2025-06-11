const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
  try {
    const proj = new Project(req.body);
    await proj.save();
    res.status(201).json(proj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
