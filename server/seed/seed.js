const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // ✅ fixes the issue
const mongoose = require('mongoose');

const Employee = require('../models/Employee');
const Project = require('../models/Project');
const Assignment = require('../models/ProjectAssignment');

// ... rest of the code (same as before)

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Employee.deleteMany();
  await Project.deleteMany();
  await Assignment.deleteMany();

  const employees = await Employee.insertMany([
    { employee_id: 'E001', full_name: 'Alice Smith', email: 'alice@example.com', hashed_password: '123' },
    { employee_id: 'E002', full_name: 'Bob Johnson', email: 'bob@example.com', hashed_password: '123' },
    { employee_id: 'E003', full_name: 'Charlie Lee', email: 'charlie@example.com', hashed_password: '123' },
    { employee_id: 'E004', full_name: 'Dana White', email: 'dana@example.com', hashed_password: '123' },
    { employee_id: 'E005', full_name: 'Eli Green', email: 'eli@example.com', hashed_password: '123' }
  ]);

  const projects = await Project.insertMany([
    { project_code: 'P001', project_name: 'Project Alpha', project_description: 'AI Research' },
    { project_code: 'P002', project_name: 'Project Beta', project_description: 'Web Development' },
    { project_code: 'P003', project_name: 'Project Gamma', project_description: 'Data Pipeline' }
  ]);

  await Assignment.insertMany([
    { employee_id: employees[0]._id, project_code: projects[0]._id, start_date: new Date() },
    { employee_id: employees[1]._id, project_code: projects[1]._id, start_date: new Date() },
    { employee_id: employees[2]._id, project_code: projects[2]._id, start_date: new Date() },
    { employee_id: employees[3]._id, project_code: projects[0]._id, start_date: new Date() },
    { employee_id: employees[4]._id, project_code: projects[1]._id, start_date: new Date() }
  ]);

  console.log('✅ Sample data inserted');
  mongoose.disconnect();
};

run();
