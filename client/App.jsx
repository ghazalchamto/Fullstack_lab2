import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [sortBy, setSortBy] = useState('start_date');

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/project_assignments');
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (key) => {
    setAssignments([...assignments].sort((a, b) =>
      a[key]?.localeCompare?.(b[key]) ?? 0
    ));
  };

  return (
    <div>
      <h2>Latest 5 Project Assignments</h2>
      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort('employee_id')}>Employee ID</th>
            <th onClick={() => handleSort('employee_name')}>Employee Name</th>
            <th onClick={() => handleSort('project_name')}>Project Name</th>
            <th onClick={() => handleSort('start_date')}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a._id}>
              <td>{a.employee_id.employee_id}</td>
              <td>{a.employee_id.full_name}</td>
              <td>{a.project_code.project_name}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
