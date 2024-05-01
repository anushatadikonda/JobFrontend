import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Homenavbar from './Homenavbar';
import Google from '../assets/images/google.jpeg';

function Savedjobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
      if (!token) {
        // Handle case where token is missing
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axios.get('http://localhost:5000/get_saved_jobs', {
        headers: {
          Authorization: `Bearer ${token}` // Include token in Authorization header
        }
      });

      if (response.status === 200) {
        setSavedJobs(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Homenavbar />
      <div className="container" style={{ marginTop: '20px' }}>
        <h2>Saved Jobs</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company Employees</th>
              <th>Job Salary</th>
              <th>About the Job</th>
              <th>Company Location</th>
              <th>Company Workplace</th>
              <th>Job Type</th>
            </tr>
          </thead>
          <tbody>
            {savedJobs.map(job => (
              <tr key={job.id}>
                <td>{job.JobTitle}</td>
                <td>{job.company_employees}</td>
                <td>{job.job_salary}</td>
                <td>{job.About_the_job}</td>
                <td>{job.company_location}</td>
                <td>{job.company_workplace}</td>
                <td>{job.job_type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Savedjobs;
