const mongoose = require('mongoose');
require('dotenv').config();
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const Assignment = require('../models/ProjectAssignment');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Employee.deleteMany({});
  await Project.deleteMany({});
  await Assignment.deleteMany({});

  const employees = await Employee.insertMany([
    { employee_id: 'E01', full_name: 'Alice Smith', email: 'alice@example.com', hashed_password: '123' },
    { employee_id: 'E02', full_name: 'Bob Lee', email: 'bob@example.com', hashed_password: '123' },
    { employee_id: 'E03', full_name: 'Charlie Kim', email: 'charlie@example.com', hashed_password: '123' },
    { employee_id: 'E04', full_name: 'Dana Xu', email: 'dana@example.com', hashed_password: '123' },
    { employee_id: 'E05', full_name: 'Evan Gomez', email: 'evan@example.com', hashed_password: '123' },
  ]);

  const projects = await Project.insertMany([
    { project_code: 'P100', project_name: 'Apollo', project_description: 'CRM Development' },
    { project_code: 'P200', project_name: 'Hermes', project_description: 'Logistics Tracker' },
    { project_code: 'P300', project_name: 'Zeus', project_description: 'AI Bot' },
  ]);

  await Assignment.insertMany([
    { employee_id: employees[0]._id, project_code: projects[0]._id, start_date: new Date() },
    { employee_id: employees[1]._id, project_code: projects[1]._id, start_date: new Date() },
    { employee_id: employees[2]._id, project_code: projects[2]._id, start_date: new Date() },
  ]);

  console.log('✅ Seeded DB');
  process.exit();
};

run();
