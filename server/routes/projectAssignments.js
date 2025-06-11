const express = require('express');
const router = express.Router();
const ProjectAssignment = require('../models/ProjectAssignment');

router.post('/', async (req, res) => {
  try {
    const assignment = new ProjectAssignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await ProjectAssignment.find()
      .populate('employee_id', 'employee_id full_name')
      .populate('project_code', 'project_name')
      .sort({ start_date: -1 })
      .limit(5);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
