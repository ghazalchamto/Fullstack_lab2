import React, { useEffect, useState } from 'react';

export default function App() {
  const [assignments, setAssignments] = useState([]);
  const [employeeForm, setEmployeeForm] = useState({ employee_id: '', full_name: '', email: '', hashed_password: '' });
  const [projectForm, setProjectForm] = useState({ project_code: '', project_name: '', project_description: '' });
  const [assignmentForm, setAssignmentForm] = useState({ employee_id: '', project_code: '', start_date: '' });

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchAssignments = () => {
    fetch('http://localhost:5000/api/project_assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('Fetch failed:', err));
  };

  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(fetchAssignments, 60000); // refresh every 60 sec
    return () => clearInterval(interval);
  }, []);

  const handlePost = async (endpoint, data, resetFn) => {
    const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    alert(json.error || 'Success!');
    if (resetFn) resetFn();
    if (endpoint === 'project_assignments') fetchAssignments();
  };

  const getNested = (obj, path) =>
    path.split('.').reduce((acc, key) => acc?.[key] ?? '', obj);

  const handleSort = (field) => {
    let order = 'asc';
    if (sortField === field && sortOrder === 'asc') {
      order = 'desc';
    }

    const sorted = [...assignments].sort((a, b) => {
      const aVal = getNested(a, field);
      const bVal = getNested(b, field);
      return (aVal > bVal ? 1 : -1) * (order === 'asc' ? 1 : -1);
    });

    setAssignments(sorted);
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Project Assignments</h1>

      {/* Add Employee */}
      <h2>Add New Employee</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handlePost('employees', employeeForm, () => setEmployeeForm({ employee_id: '', full_name: '', email: '', hashed_password: '' }));
      }}>
        <input placeholder="Employee ID" value={employeeForm.employee_id} onChange={e => setEmployeeForm({ ...employeeForm, employee_id: e.target.value })} required />
        <input placeholder="Full Name" value={employeeForm.full_name} onChange={e => setEmployeeForm({ ...employeeForm, full_name: e.target.value })} required />
        <input placeholder="Email" value={employeeForm.email} onChange={e => setEmployeeForm({ ...employeeForm, email: e.target.value })} required />
        <input placeholder="Password" value={employeeForm.hashed_password} onChange={e => setEmployeeForm({ ...employeeForm, hashed_password: e.target.value })} required />
        <button type="submit">Add Employee</button>
      </form>

      {/* Add Project */}
      <h2>Add New Project</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handlePost('projects', projectForm, () => setProjectForm({ project_code: '', project_name: '', project_description: '' }));
      }}>
        <input placeholder="Project Code" value={projectForm.project_code} onChange={e => setProjectForm({ ...projectForm, project_code: e.target.value })} required />
        <input placeholder="Project Name" value={projectForm.project_name} onChange={e => setProjectForm({ ...projectForm, project_name: e.target.value })} required />
        <input placeholder="Description" value={projectForm.project_description} onChange={e => setProjectForm({ ...projectForm, project_description: e.target.value })} required />
        <button type="submit">Add Project</button>
      </form>

      {/* Assign Project */}
      <h2>Assign Project to Employee</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handlePost('project_assignments', assignmentForm, () => setAssignmentForm({ employee_id: '', project_code: '', start_date: '' }));
      }}>
        <input placeholder="Employee ID (e.g. E001)" value={assignmentForm.employee_id} onChange={e => setAssignmentForm({ ...assignmentForm, employee_id: e.target.value })} required />
        <input placeholder="Project Code (e.g. P001)" value={assignmentForm.project_code} onChange={e => setAssignmentForm({ ...assignmentForm, project_code: e.target.value })} required />
        <input type="date" value={assignmentForm.start_date} onChange={e => setAssignmentForm({ ...assignmentForm, start_date: e.target.value })} required />
        <button type="submit">Assign</button>
      </form>

      {/* Table with sorting */}
      <h2>Latest Assignments</h2>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th onClick={() => handleSort('employee_id.employee_id')} style={{ cursor: 'pointer' }}>Employee ID</th>
            <th onClick={() => handleSort('employee_id.full_name')} style={{ cursor: 'pointer' }}>Employee Name</th>
            <th onClick={() => handleSort('project_code.project_name')} style={{ cursor: 'pointer' }}>Project Name</th>
            <th onClick={() => handleSort('start_date')} style={{ cursor: 'pointer' }}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 ? (
            <tr><td colSpan="4">No assignments found.</td></tr>
          ) : (
            assignments.map((a, i) => (
              <tr key={i}>
                <td>{a.employee_id?.employee_id}</td>
                <td>{a.employee_id?.full_name}</td>
                <td>{a.project_code?.project_name}</td>
                <td>{new Date(a.start_date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
