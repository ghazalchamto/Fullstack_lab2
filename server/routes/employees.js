const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// POST: Add new employee
router.post('/', async (req, res) => {
  const { employee_id, full_name, email, hashed_password } = req.body;

  if (!employee_id || !full_name || !email || !hashed_password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existing = await Employee.findOne({ employee_id });
    if (existing) {
      return res.status(400).json({ error: 'Employee ID must be unique' });
    }

    const employee = new Employee({ employee_id, full_name, email, hashed_password });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Server error while adding employee' });
  }
});

module.exports = router;
