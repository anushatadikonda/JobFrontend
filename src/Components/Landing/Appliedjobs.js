import React, { useState, useEffect } from 'react';
import Homenavbar from './Homenavbar';
import Table from 'react-bootstrap/Table';

function Appliedjobs() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Token not available');
      return;
    }

    fetch('http://127.0.0.1:5000/user_job_applications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch job applications');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data structure for troubleshooting
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error('Data received is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching job applications:', error);
        setError('Failed to fetch job applications. Please try again later.');
      });
  }, []);

  return (
    <div>
      <Homenavbar />
      {error && <p>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company Employees</th>
            <th>Job Salary</th>
            <th>About the Job</th>
            <th>Company Location</th>
            <th>Company Workplace</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.application_id}>
              <td>{application.job_details.job_title}</td>
              <td>{application.job_details.company_employees}</td>
              <td>{application.job_details.job_salary}</td>
              <td>{application.job_details.job_description}</td>
              <td>{application.job_details.company_location}</td>
              <td>{application.job_details.company_workplace}</td>
              <td>{application.application_status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Appliedjobs;
