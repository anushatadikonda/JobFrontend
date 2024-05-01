import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button, Modal } from 'react-bootstrap'; // Import Bootstrap components

const JobResult = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://127.0.0.1:5000/job_applications', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch job applications');
        }
        const data = await response.json();
        setJobApplications(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchJobApplications();
  }, []);

  const updateJobApplicationStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:5000/job_application/${selectedApplication.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) {
        throw new Error('Failed to update job application status');
      }
      const updatedJobApplications = jobApplications.map(application => {
        if (application.id === selectedApplication.id) {
          return { ...application, status: newStatus };
        }
        return application;
      });
      setJobApplications(updatedJobApplications);
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenModal = (application) => {
    setSelectedApplication(application);
    setNewStatus(application.status);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setNewStatus('');
    setShowModal(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Job Applications</h2>
      <ul>
        {jobApplications.map(application => (
          <li key={application.id}>
            <div>
              <strong>User ID:</strong> {application.user_id}
            </div>
            <div>
              <strong>Job ID:</strong> {application.id}
            </div>
            <div>
              <strong>Status:</strong> {application.status}
            </div>
            <div>
              <strong>firstname:</strong> {application.user.firstname}
            </div>
            <div>
              <strong>Applied At:</strong> {application.upload_resume}
            </div>
            <div>
              <button onClick={() => handleOpenModal(application)}>Edit Status</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select className="form-control" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateJobApplicationStatus}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobResult;
