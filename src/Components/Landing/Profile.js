import React, { useEffect, useState } from 'react';
import Homenavbar from './Homenavbar';
import axios from 'axios';

function Profile() {
    const [data, getData] = useState({});
    const [education, setEducation] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [educationFormData, setEducationFormData] = useState({
        institution_name: '',
        degree: '',
        field_of_study: '',
        description: '',
        start_date: '',
        end_date: ''
    });
    const [experienceFormData, setExperienceFormData] = useState({
        company_name: '',
        position: '',
        exp_start_date: '',
        exp_end_date: '',
        exp_description: ''
    });
    const [editEducationId, setEditEducationId] = useState(null);
    const [editExperienceId, setEditExperienceId] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const profileResponse = await axios.get('http://localhost:5000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (profileResponse.status === 201) {
                    const userData = profileResponse.data[0];
                    getData(userData);
                }

                const educationResponse = await axios.get('http://localhost:5000/geteducation', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Education Response:", educationResponse.data); // Log the education response
                if (educationResponse.status === 201) {
                    // Check if the education data is an object, and wrap it inside an array if needed
                    const educationData = Array.isArray(educationResponse.data) ? educationResponse.data : [educationResponse.data];
                    setEducation(educationData);
                }

                const experienceResponse = await axios.get('http://localhost:5000/get_experience', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (experienceResponse.status === 201) {
                    setExperiences(experienceResponse.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducationFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setExperienceFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addEducation = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await axios.post('http://localhost:5000/education', educationFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    // Fetch updated education data
                    fetchProfileData();
                    // Clear education form data
                    setEducationFormData({
                        institution_name: '',
                        degree: '',
                        field_of_study: '',
                        description: '',
                        start_date: '',
                        end_date: ''
                    });
                    setShowEducationModal(false); // Close the modal after successful submission
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const addExperience = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await axios.post('http://localhost:5000/experience', experienceFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    // Fetch updated experience data
                    fetchProfileData();
                    // Clear experience form data
                    setExperienceFormData({
                        company_name: '',
                        position: '',
                        exp_start_date: '',
                        exp_end_date: '',
                        exp_description: ''
                    });
                    setShowExperienceModal(false); // Close the modal after successful submission
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const deleteEducation = async (eduId) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await axios.delete(`http://localhost:5000/delete_education/${eduId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    // Fetch updated education data
                    fetchProfileData();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const deleteExperience = async (expId) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await axios.delete(`http://localhost:5000/del_usr_exp/${expId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    // Fetch updated experience data
                    fetchProfileData();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };


    const editEducation = (edu) => {
        setEducationFormData({
            institution_name: edu.institution_name,
            degree: edu.degree,
            field_of_study: edu.field_of_study,
            description: edu.description,
            start_date: edu.start_date,
            end_date: edu.end_date
        });
        setEditEducationId(edu.id);
        setShowEducationModal(true);
    };

    const updateEducation = async () => {
        const token = localStorage.getItem('access_token');
        if (token && editEducationId) {
            try {
                const response = await axios.put(`http://localhost:5000/update_education/${editEducationId}`, educationFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    fetchProfileData();
                    setEducationFormData({
                        institution_name: '',
                        degree: '',
                        field_of_study: '',
                        description: '',
                        start_date: '',
                        end_date: ''
                    });
                    setShowEducationModal(false);
                    setEditEducationId(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const editExperience = (exp) => {
        setExperienceFormData({
            company_name: exp.company_name,
            position: exp.position,
            exp_start_date: exp.exp_start_date,
            exp_end_date: exp.exp_end_date,
            exp_description: exp.exp_description
        });
        setEditExperienceId(exp.id);
        setShowExperienceModal(true);
    };

    const updateExperience = async () => {
        const token = localStorage.getItem('access_token');
        if (token && editExperienceId) {
            try {
                const response = await axios.put(`http://localhost:5000/user_upd_exp/${editExperienceId}`, experienceFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    fetchProfileData();
                    setExperienceFormData({
                        company_name: '',
                        position: '',
                        exp_start_date: '',
                        exp_end_date: '',
                        exp_description: ''
                    });
                    setShowExperienceModal(false);
                    setEditExperienceId(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <div className="container">
            <Homenavbar />
            <div className="tab-content profile-tab" id="myTabContent" style={{marginTop:'50px'}}>
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                        <div className="col-md-6">
                            <label>User Id</label>
                        </div>
                        <div className="col-md-6">
                            <p>{data.id}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Name</label>
                        </div>
                        <div className="col-md-6">
                            <p>{data.firstname}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Email</label>
                        </div>
                        <div className="col-md-6">
                            <p>{data.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                            <p>{data.phone_number}</p>
                        </div>
                    </div>
                </div>

                {/* Education details */}
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <h3>Education</h3>
                    {education.map(edu => (
                        <div key={edu.id}>
                            <p>{edu.institution_name}</p>
                            <p>{edu.degree}</p>
                            <p>{edu.field_of_study}</p>
                            <p>{edu.description}</p>
                            <p>{edu.start_date} - {edu.end_date}</p>
                        </div>
                    ))}

                    <h3>Experience</h3>
                    {experiences.map(exp => (
                        <div key={exp.id}>
                            <p>{exp.company_name}</p>
                            <p>{exp.position}</p>
                            <p>{exp.exp_start_date} - {exp.exp_end_date}</p>
                            <p>{exp.exp_description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Add Education Modal */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showEducationModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editEducationId ? "Edit Education" : "Add Education"}</h5>
                            <button type="button" className="close" onClick={() => setShowEducationModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => { e.preventDefault(); editEducationId ? updateEducation() : addEducation(); }}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="institution_name" value={educationFormData.institution_name} onChange={handleEducationChange} placeholder="Institution Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="degree" value={educationFormData.degree} onChange={handleEducationChange} placeholder="Degree" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="field_of_study" value={educationFormData.field_of_study} onChange={handleEducationChange} placeholder="Field of Study" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="description" value={educationFormData.description} onChange={handleEducationChange} placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <input type="date" className="form-control" name="start_date" value={educationFormData.start_date} onChange={handleEducationChange} placeholder="Start Date" />
                                </div>
                                <div className="form-group">
                                    <input type="date" className="form-control" name="end_date" value={educationFormData.end_date} onChange={handleEducationChange} placeholder="End Date" />
                                </div>
                                <button type="submit" className="btn btn-primary">{editEducationId ? "Update Education" : "Add Education"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Experience Modal */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showExperienceModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editExperienceId ? "Edit Experience" : "Add Experience"}</h5>
                            <button type="button" className="close" onClick={() => setShowExperienceModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => { e.preventDefault(); editExperienceId ? updateExperience() : addExperience(); }}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="company_name" value={experienceFormData.company_name} onChange={handleExperienceChange} placeholder="Company Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="position" value={experienceFormData.position} onChange={handleExperienceChange} placeholder="Position" />
                                </div>
                                <div className="form-group">
                                    <input type="date" className="form-control" name="exp_start_date" value={experienceFormData.exp_start_date} onChange={handleExperienceChange} placeholder="Start Date" />
                                </div>
                                <div className="form-group">
                                    <input type="date" className="form-control" name="exp_end_date" value={experienceFormData.exp_end_date} onChange={handleExperienceChange} placeholder="End Date" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="exp_description" value={experienceFormData.exp_description} onChange={handleExperienceChange} placeholder="Description"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">{editExperienceId ? "Update Experience" : "Add Experience"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons to trigger modals */}
            <div className="my-3">
                <button className="btn btn-primary mr-2" onClick={() => setShowEducationModal(true)}>Add Education</button>
            </div>

            {/* Display education details */}
            <div>
                <h2>Education</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Institution Name</th>
                            <th>Degree</th>
                            <th>Field of Study</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education.map(edu => (
                            <tr key={edu.id}>
                                <td>{edu.institution_name}</td>
                                <td>{edu.degree}</td>
                                <td>{edu.field_of_study}</td>
                                <td>{edu.description}</td>
                                <td>{edu.start_date}</td>
                                <td>{edu.end_date}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => editEducation(edu)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteEducation(edu.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary" onClick={() => setShowExperienceModal(true)}>Add Experience</button>
            {/* Display experience details */}
            <div>
                <h2>Experience</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Position</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences.map(exp => (
                            <tr key={exp.id}>
                                <td>{exp.company_name}</td>
                                <td>{exp.position}</td>
                                <td>{exp.exp_start_date}</td>
                                <td>{exp.exp_end_date}</td>
                                <td>{exp.exp_description}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => editExperience(exp)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteExperience(exp.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profile;
