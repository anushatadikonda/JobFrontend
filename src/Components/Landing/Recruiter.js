import React, { useEffect, useState } from 'react';
import { Table, Button, Collapse, Modal, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Recruiter() {
  const [openRow, setOpenRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [formData, setFormData] = useState({
    JobTitle: '',
    company_employees: '',
    job_prefer_skills: '',
    job_salary: '',
    About_the_job: '',
    preferred_qualification: '',
    job_Responsibilities: '',
    company_location: '',
    company_workplace: '',
    job_type: '',
    company_logo: '',
  });
  const [editFormData, setEditFormData] = useState({
    id: '',
    JobTitle: '',
    company_employees: '',
    job_prefer_skills: '',
    job_salary: '',
    About_the_job: '',
    preferred_qualification: '',
    job_Responsibilities: '',
    company_location: '',
    company_workplace: '',
    job_type: '',
    company_logo: '',
    status: '', // Add status field to editFormData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevEditFormData) => ({
      ...prevEditFormData,
      [name]: value,
    }));
  };
  const handleAddModalOpen = () => setShowAddModal(true);
  const handleEditModalOpen = (recruiter) => {
    setEditFormData(recruiter);
    setShowEditModal(true);
  };
  const handleEditStatusModalOpen = () => setShowEditStatusModal(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/job_poistion', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          alert('Recruiter added successfully');
          getJobData();
          handleCloseModal();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.put(`http://127.0.0.1:5000/update_jobPosting/${editFormData.id}`, editFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          alert('Recruiter updated successfully');
          getJobData();
          handleCloseEditModal();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_job_applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          setRecruiters(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRowClick = (id) => {
    setOpenRow(openRow === id ? null : id);
  };



  const handleCloseModal = () => {
    setSelectedApplication(null);
    setNewStatus('');
    setShowModal(false);
    setFormData({
      JobTitle: '',
      company_employees: '',
      job_prefer_skills: '',
      job_salary: '',
      About_the_job: '',
      preferred_qualification: '',
      job_Responsibilities: '',
      company_location: '',
      company_workplace: '',
      job_type: '',
      company_logo: '',
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditFormData({
      id: '',
      JobTitle: '',
      company_employees: '',
      job_prefer_skills: '',
      job_salary: '',
      About_the_job: '',
      preferred_qualification: '',
      job_Responsibilities: '',
      company_location: '',
      company_workplace: '',
      job_type: '',
      company_logo: '',
      status: '', // Reset status field
    });
  };
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.delete(`http://127.0.0.1:5000/delete_jobPosting/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          alert('Recruiter deleted successfully');
          getJobData();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const Logout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleOpenModal = (application, type) => {
    if (type === 'edit') {
      // Open modal for editing job details
      setSelectedApplication(application);
      setNewStatus(application.status);
      setShowModal(true);
    } else if (type === 'status') {
      // Open modal for editing job application status
      setSelectedApplication(application);
      setNewStatus(application.status);
      setShowEditStatusModal(true);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem('access_token');
    try {
      if (token) {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          const user = response.data[0];
          setUserData(user);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseAddModal = () => {
    // Reset any form data if needed
    setShowAddModal(false);
  };

  const handleProfileModalClose = () => setShowProfileModal(false);
  const handleProfileButtonClick = () => setShowProfileModal(true);

  const [jobApplications, setJobApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Access token not found');
        }

        const response = await axios.get('http://127.0.0.1:5000/job_applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response from backend:", response.data);
        if (response.status === 200) {
          setJobApplications(response.data);
        } else {
          throw new Error('Failed to fetch job applications');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobApplications();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  const handleCloseEditStatusModal = () => {
    setShowEditStatusModal(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
          <div class="app-header header-shadow">
            <div class="app-header__logo">
              <div class="header__pane ml-auto">
                <div>

                </div>
              </div>
            </div>
            <div class="app-header__mobile-menu">
              <div>
                <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </button>
              </div>
            </div>

            <div class="app-header__content">
              <div class="homelogo">
                <span class="material-symbols-outlined">work_update</span>
                <h2>Hired</h2>
              </div>
              <div class="app-header-right">
                <ul class="header-menu nav">
                  <li class="btn-group nav-item">
                    <button class="btn btn-primary" onClick={handleProfileButtonClick}>Profile</button>
                  </li><br />
                  <li class="dropdown nav-item">
                    <button class="btn btn-danger" onClick={Logout}>Logout</button>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          <div class="app-main">
            <div class="app-main__outer">
              <div class="app-main__inner">
                <div class="row">
                  <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content bg-midnight-bloom">
                      <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                          <div class="widget-heading">Jobs</div>
                          <div class="widget-subheading">Total Jobs</div>

                        </div>
                        <div class="widget-content-right">
                          <div class="widget-numbers text-white"><span>&nbsp;{recruiters.length} </span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content bg-midnight-bloom">
                      <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                          <div class="widget-heading">Applied Jobs</div>
                          <div class="widget-subheading">Total Applied Jobs</div>

                        </div>
                        <div class="widget-content-right">
                          <div class="widget-numbers text-white"><span>&nbsp;{jobApplications.length} </span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  */}
                </div>

                <div class="row">

                  <div class="col-md-6">
                    <div class="main-card mb-3 card" style={{ width: '100%' }}>
                    <Button variant="primary" onClick={handleAddModalOpen}>
  Add Jobs
</Button>

                      <div class="card-header">Active Jobs
                      </div>
                      <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                          <thead>
                            <tr>
                              <th class="text-center">#</th>
                              <th>Job Title</th>
                              <th class="text-center">Salary</th>
                              <th class="text-center">About the Job </th>
                              <th class="text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recruiters.map((user, index) => (
                              <tr key={index}>
                                <td class="text-center text-muted">{user.id}</td>
                                <td>
                                  <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                      <div class="widget-content-left mr-3">
                                        <div class="widget-content-left">
                                          <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="" />
                                        </div>
                                      </div>
                                      <div class="widget-content-left flex2">
                                        <div class="widget-heading">{user.JobTitle}</div>
                                        <div class="widget-subheading opacity-7">{user.company_employees}</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td class="text-center">{user.job_salary}</td>
                                <td class="text-center">
                                  <div >{user.About_the_job}</div>
                                </td>
                                <td class="text-center">
                                  <Button variant="primary" onClick={() => handleEditModalOpen(user)}>Edit</Button>
                                  <Button variant="primary" className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</Button>

                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="main-card mb-3 card" style={{ width: '100%' }}>
                      <div class="card-header">Applied Jobs
                      </div>
                      <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                          <thead>
                            <tr>
                              <th class="text-center">#</th>
                              <th>Name</th>
                              <th class="text-center">Email</th>
                              <th class="text-center">Resume </th>
                              <th class="text-center">Skills </th>
                              <th class="text-center">Status </th>
                              <th class="text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {jobApplications.map(application => (
                              <tr key={application.id}>
                                <td class="text-center text-muted">{application.id}</td>
                                <td>
                                  <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                      <div class="widget-content-left mr-3">
                                        <div class="widget-content-left">
                                          <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="" />
                                        </div>
                                      </div>
                                      <div class="widget-content-left flex2">
                                        <div class="widget-heading">{application.user.firstname}</div>
                                        <div class="widget-subheading opacity-7">{application.user.lastname}</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td class="text-center">{application.user.email}</td>
                                <td class="text-center">
                                  <div >{application.upload_resume}</div>
                                </td>
                                <td class="text-center">
                                  <div >{application.application_text}</div>
                                </td>
                                <td class="text-center">
                                  <div >{application.status}</div>
                                </td>
                                <td class="text-center">
                                  <Button variant="primary" onClick={() => handleOpenModal(application, 'status')}>Edit</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        {/* Edit Modal */}
        <Modal show={showAddModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Jobs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="JobTitle">
                <Form.Label>Job Title:</Form.Label>
                <Form.Control type="text" name="JobTitle" value={formData.JobTitle} onChange={handleChange} placeholder="Enter Job Title" />
              </Form.Group>
              <Form.Group controlId="company_employees">
                <Form.Label>Company Employees:</Form.Label>
                <Form.Control type="text" name="company_employees" value={formData.company_employees} onChange={handleChange} placeholder="Enter Company Employees" />
              </Form.Group>
              <Form.Group controlId="job_prefer_skills">
                <Form.Label>Preferred Skills:</Form.Label>
                <Form.Control type="text" name="job_prefer_skills" value={formData.job_prefer_skills} onChange={handleChange} placeholder="Enter Preferred Skills" />
              </Form.Group>
              <Form.Group controlId="job_salary">
                <Form.Label>Job Salary:</Form.Label>
                <Form.Control type="text" name="job_salary" value={formData.job_salary} onChange={handleChange} placeholder="Enter Job Salary" />
              </Form.Group>
              <Form.Group controlId="About_the_job">
                <Form.Label>About the Job:</Form.Label>
                <Form.Control type="text" name="About_the_job" value={formData.About_the_job} onChange={handleChange} placeholder="Enter About the Job" />
              </Form.Group>
              <Form.Group controlId="preferred_qualification">
                <Form.Label>Preferred Qualifications:</Form.Label>
                <Form.Control type="text" name="preferred_qualification" value={formData.preferred_qualification} onChange={handleChange} placeholder="Enter Preferred Qualifications" />
              </Form.Group>
              <Form.Group controlId="job_Responsibilities">
                <Form.Label>Job Responsibilities:</Form.Label>
                <Form.Control type="text" name="job_Responsibilities" value={formData.job_Responsibilities} onChange={handleChange} placeholder="Enter Job Responsibilities" />
              </Form.Group>
              <Form.Group controlId="company_location">
                <Form.Label>Company Location:</Form.Label>
                <Form.Control type="text" name="company_location" value={formData.company_location} onChange={handleChange} placeholder="Enter Company Location" />
              </Form.Group>
              <Form.Group controlId="company_workplace">
                <Form.Label>Company Workplace:</Form.Label>
                <Form.Select name="company_workplace" value={formData.company_workplace} onChange={handleChange}>
                  <option value="">Select Workplace</option>
                  <option value="on-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="WorkfromHome">Work from Home</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="job_type">
                <Form.Label>Job Type:</Form.Label>
                <Form.Select name="job_type" value={formData.job_type} onChange={handleChange}>
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="company_logo">
                <Form.Label>Company Name:</Form.Label>
                <Form.Control type="text" name="company_logo" value={formData.company_logo} onChange={handleChange} placeholder="Enter Company Logo" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
  Close
</Button>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recruiter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="EditJobTitle">
                <Form.Label>Job Title:</Form.Label>
                <Form.Control type="text" name="JobTitle" value={editFormData.JobTitle} onChange={handleEditChange} placeholder="Enter Job Title" />
              </Form.Group>
              <Form.Group controlId="EditCompanyEmployees">
                <Form.Label>Company Employees:</Form.Label>
                <Form.Control type="text" name="company_employees" value={editFormData.company_employees} onChange={handleEditChange} placeholder="Enter Company Employees" />
              </Form.Group>
              <Form.Group controlId="EditJobPreferSkills">
                <Form.Label>Preferred Skills:</Form.Label>
                <Form.Control type="text" name="job_prefer_skills" value={editFormData.job_prefer_skills} onChange={handleEditChange} placeholder="Enter Preferred Skills" />
              </Form.Group>
              <Form.Group controlId="EditJobSalary">
                <Form.Label>Job Salary:</Form.Label>
                <Form.Control type="text" name="job_salary" value={editFormData.job_salary} onChange={handleEditChange} placeholder="Enter Job Salary" />
              </Form.Group>
              <Form.Group controlId="EditAboutTheJob">
                <Form.Label>About the Job:</Form.Label>
                <Form.Control type="text" name="About_the_job" value={editFormData.About_the_job} onChange={handleEditChange} placeholder="Enter About the Job" />
              </Form.Group>
              <Form.Group controlId="EditPreferredQualification">
                <Form.Label>Preferred Qualifications:</Form.Label>
                <Form.Control type="text" name="preferred_qualification" value={editFormData.preferred_qualification} onChange={handleEditChange} placeholder="Enter Preferred Qualifications" />
              </Form.Group>
              <Form.Group controlId="EditJobResponsibilities">
                <Form.Label>Job Responsibilities:</Form.Label>
                <Form.Control type="text" name="job_Responsibilities" value={editFormData.job_Responsibilities} onChange={handleEditChange} placeholder="Enter Job Responsibilities" />
              </Form.Group>
              <Form.Group controlId="EditCompanyLocation">
                <Form.Label>Company Location:</Form.Label>
                <Form.Control type="text" name="company_location" value={editFormData.company_location} onChange={handleEditChange} placeholder="Enter Company Location" />
              </Form.Group>
              <Form.Group controlId="EditCompanyWorkplace">
                <Form.Label>Company Workplace:</Form.Label>
                <Form.Select name="company_workplace" value={editFormData.company_workplace} onChange={handleEditChange}>
                  <option value="">Select Workplace</option>
                  <option value="on-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="WorkfromHome">Work from Home</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="EditJobType">
                <Form.Label>Job Type:</Form.Label>
                <Form.Select name="job_type" value={editFormData.job_type} onChange={handleEditChange}>
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </Form.Select>
              </Form.Group>
              {/* <Form.Group controlId="EditCompanyLogo">
                <Form.Label>Company Logo:</Form.Label>
                <Form.Control type="text" name="company_logo" value={editFormData.company_logo} onChange={handleEditChange} placeholder="Enter Company Logo" />
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showProfileModal} onHide={handleProfileModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userData && (
              <div>
                <p><strong>First Name:</strong> {userData.firstname}</p>
                <p><strong>Last Name:</strong> {userData.lastname}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>User Role:</strong> {userData.user_role}</p>
                {/* Add more user details as needed */}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleProfileModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditStatusModal} onHide={handleCloseModal}>
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
            <Button variant="secondary" onClick={handleCloseEditStatusModal}>
              Close
            </Button>

            <Button variant="primary" onClick={updateJobApplicationStatus}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Recruiter;
