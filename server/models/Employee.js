const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true },
  full_name: String,
  email: String,
  hashed_password: String
});

module.exports = mongoose.model('Employee', employeeSchema);
