const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// POST: Add new project
router.post('/', async (req, res) => {
  const { project_code, project_name, project_description } = req.body;

  if (!project_code || !project_name || !project_description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existing = await Project.findOne({ project_code });
    if (existing) {
      return res.status(400).json({ error: 'Project code must be unique' });
    }

    const project = new Project({ project_code, project_name, project_description });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error while adding project' });
  }
});

module.exports = router;
