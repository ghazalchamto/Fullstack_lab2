const express = require('express');
const router = express.Router();
const Assignment = require('../models/ProjectAssignment');
const Employee = require('../models/Employee');
const Project = require('../models/Project');

// GET: Get all assignments with populated data
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .sort({ start_date: -1 })
      .limit(5)
      .populate('employee_id')
      .populate('project_code');

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// POST: Assign employee to project
router.post('/', async (req, res) => {
  const { employee_id, project_code, start_date } = req.body;

  if (!employee_id || !project_code || !start_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const employee = await Employee.findOne({ employee_id });
    const project = await Project.findOne({ project_code });

    if (!employee || !project) {
      return res.status(404).json({ error: 'Invalid employee_id or project_code' });
    }

    const assignment = new Assignment({
      employee_id: employee._id,
      project_code: project._id,
      start_date: new Date(start_date)
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: 'Server error while assigning project' });
  }
});

module.exports = router;
