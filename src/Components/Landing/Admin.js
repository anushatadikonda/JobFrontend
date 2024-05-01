import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleEditModalClose = () => setShowEditModal(false);
    const handleDeleteModalClose = () => setShowDeleteModal(false);

    const navigate = useNavigate();
    const [getdata, getUserData] = useState([]);
    const [jobdata, getJobdata] = useState([]);
    useEffect(() => {
        userGetData();
    }, [])

    const userGetData = async () => {
        const token = localStorage.getItem('access_token')
        try {
            if (token) {
                const response = await axios.get('http://127.0.0.1:5000/get_all_user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 201) {
                    getUserData(response.data)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
        if (accessToken) {
            try {
                const response = await axios.get('http://localhost:5000/getalljobs', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.status === 201) {
                    const data = response.data;
                    getJobdata(data);
                    console.log(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleEditClick = (data) => {
        setEditData(data); // Set the data to be edited
        setShowEditModal(true); // Open the edit modal
    };

    const handleDeleteClick = () => {
        // Handle delete logic here
        // For example, show confirmation modal
        setShowDeleteModal(true);
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token && editData) {
                const response = await axios.put(`http://127.0.0.1:5000/update_user_role/${editData.id}`, {
                    new_role: editData.user_role
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 201) {
                    // Handle success, maybe show a success message
                    console.log(response.data.message);
                    // Close the edit modal
                    setShowEditModal(false);
                    // Refresh user data
                    userGetData();
                }
            }
        } catch (error) {
            console.error(error);
            // Handle error, maybe show an error message
        }
    };
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewJobData, setViewJobData] = useState(null);

    // Function to handle opening view modal
    const handleViewModalOpen = (job) => {
        setViewJobData(job); // Set the job data to be viewed
        setShowViewModal(true); // Open the view modal
    };

    // Function to handle closing view modal
    const handleViewModalClose = () => setShowViewModal(false);

    const Logout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [userData, setUserData] = useState(null);

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

    const handleProfileModalClose = () => setShowProfileModal(false);
    const handleProfileButtonClick = () => setShowProfileModal(true);

    return (
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
                                </li>
                                <li class="dropdown nav-item">
                                    <button  class="btn btn-danger" onClick={Logout}>Logout</button>
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
                                                <div class="widget-heading">Users</div>
                                                <div class="widget-subheading">Total Users</div>

                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-white"><span>&nbsp;{getdata.length} </span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-4">
                                    <div class="card mb-3 widget-content bg-arielle-smile">
                                        <div class="widget-content-wrapper text-white">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Recruiters</div>
                                                <div class="widget-subheading">Total Recruiters</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-white"><span>{getdata.filter(user => user.user_role === 'recruiter').length}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-4">
                                    <div class="card mb-3 widget-content bg-grow-early">
                                        <div class="widget-content-wrapper text-white">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Jobs</div>
                                                <div class="widget-subheading">Total Jobs</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-white"><span>{jobdata.length}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-xl-none d-lg-block col-md-6 col-xl-4">
                                    <div class="card mb-3 widget-content bg-premium-dark">
                                        <div class="widget-content-wrapper text-white">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Products Sold</div>
                                                <div class="widget-subheading">Revenue streams</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-warning"><span>$14M</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="main-card mb-3 card" style={{ width: '100%' }}>
                                        <div class="card-header">Active Users
                                        </div>
                                        <div class="table-responsive">
                                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">#</th>
                                                        <th>Name</th>
                                                        <th class="text-center">Email</th>
                                                        <th class="text-center">User </th>
                                                        <th class="text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getdata.map((user, index) => (
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
                                                                            <div class="widget-heading">{user.firstname}</div>
                                                                            <div class="widget-subheading opacity-7">{user.lastname}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="text-center">{user.email}</td>
                                                            <td class="text-center">
                                                                <div >{user.user_role}</div>
                                                            </td>
                                                            <td class="text-center">
                                                                <Button variant="primary" onClick={() => handleEditClick(user)}>Edit</Button>
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
                                        <div class="card-header">Active Jobs
                                        </div>
                                        <div class="table-responsive">
                                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">#</th>
                                                        <th>JobTitle</th>
                                                        <th class="text-center">Location</th>
                                                        <th class="text-center">User </th>
                                                        <th class="text-center">Salary</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {jobdata.map((job, index) => (
                                                        <tr index={index}>
                                                            <td class="text-center text-muted">{job.id}</td>
                                                            <td>
                                                                <div class="widget-content p-0">
                                                                    <div class="widget-content-wrapper">
                                                                        <div class="widget-content-left mr-3">
                                                                            <div class="widget-content-left">
                                                                                <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="widget-content-left flex2">
                                                                            <div class="widget-heading">{job.JobTitle}</div>
                                                                            <div class="widget-subheading opacity-7">{job.job_type}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="text-center">{job.company_location}</td>
                                                            <td class="text-center">
                                                                <div >{job.job_salary}</div>
                                                            </td>
                                                            <td class="text-center">
                                                                <Button variant="primary" onClick={() => handleViewModalOpen(job)}>View</Button>
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

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add your edit form here */}
                    <Form onSubmit={handleSaveChanges}>
                        {/* Populate form fields with editData */}
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={editData ? editData.firstname : ''} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={editData ? editData.email : ''} />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={editData ? editData.user_role : ''}
                                onChange={(e) => setEditData({ ...editData, user_role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="recruiter">Recruiter</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showViewModal} onHide={handleViewModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Job Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display job details */}
                    <p><strong>Job Title:</strong> {viewJobData && viewJobData.JobTitle}</p>
                    <p><strong>Location:</strong> {viewJobData && viewJobData.company_location}</p>
                    <p><strong>Salary:</strong> {viewJobData && viewJobData.job_salary}</p>
                    {/* Add more details as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleViewModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
                    <Button variant="danger">Delete</Button>
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
        </div>
    );
}

export default Admin;
