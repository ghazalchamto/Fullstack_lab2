const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  employee_id: { type: String, ref: 'Employee' },
  project_code: { type: String, ref: 'Project' },
  start_date: Date
});

module.exports = mongoose.model('ProjectAssignment', assignmentSchema);
