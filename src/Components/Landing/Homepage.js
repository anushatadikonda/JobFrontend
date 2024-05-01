import React, { useState, useEffect } from 'react';
import '../assets/css/homepage.css';
import Google from '../assets/images/google.jpeg';
import Homenavbar from './Homenavbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
function Homepage() {
  const [jobdata, getJobdata] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationText, setApplicationText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

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

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };


  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };
  const saveJob = async (jobId, userId) => {
    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await axios.post('http://localhost:5000/save_job', {
        user_id: userId, // Use userId instead of data.id
        job_id: jobId
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.status === 201) {
        alert('Job saved successfully');
        // Optionally update UI to reflect that the job is saved
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Please try again.');
    }
  };


  const [data, getData] = useState([])
  useEffect(() => {
    fetchJobs();
  }, [])
  const fetchJobs = async () => {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 201) {
          const user = response.data[0]
          getData(user);
          console.log(user)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
  }
  const applyJob = async () => {
    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await axios.post('http://localhost:5000/apply_job', {
        job_id: selectedJob.id,
        application_text: 'Your application text here' // You can customize this
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.status === 201) {
        alert('Job application submitted successfully');
        // Optionally update UI to reflect that the job application is submitted
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Error applying for job. Please try again.');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedJob) {
      alert('Please select a job');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('job_id', selectedJob.id);
      formData.append('application_text', applicationText);
      formData.append('file', resumeFile);

      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post('http://localhost:5000/apply_job', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 201) {
        alert('Job application submitted successfully');
        setShowApplyModal(false);
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Error applying for job. Please try again.');
    }
  };

  return (
    <div className="homepage">
      <Homenavbar />
      <section className="jobSection">
        <div className="jobDetails">
          <div className="jobleftdetails">
            {jobdata.map((datas) => (
              <ul key={datas.id} onClick={() => handleJobClick(datas)}>
                <li>
                  <div className="jdetails">
                    <img src={Google} alt="" />
                    <h3 className="jobtitle">{datas.JobTitle} (English)</h3>
                  </div>
                  <p className="companytitle">
                    <span>Company name:{datas.company_logo}</span>

                  </p>
                  <p className="leftlocation">{datas.company_location} ({datas.company_workplace})</p>
                </li>
              </ul>
            ))}
          </div>
        </div>

        <div className="jobdata">
          {selectedJob && (
            <div className="jobdata1step">
              <h3>{selectedJob.title}</h3>
              <div className="jobicon">
                <span className="material-symbols-outlined">
                  work
                </span>
                <p><span className="jobspace">{selectedJob.job_type}</span>.<span className="jobtype">{selectedJob.JobTitle}</span>. <span className="joblevel">{selectedJob.job_level}</span></p>
              </div>
              <div className="jobicon">
                <span className="material-symbols-outlined">
                  apartment
                </span>
                <p><span className="jobspace">{selectedJob.company_size}</span><span className="jobtype">{selectedJob.company_employees}</span></p>
              </div>
              <div className="jobicon">
                <span className="material-symbols-outlined">
                  format_list_bulleted
                </span>
                <p><span className="jobspace">Skills:</span><span className="jobtype">{selectedJob.job_prefer_skills}</span></p>
              </div>
              <div className="jobicon">
                <span className="material-symbols-outlined">
                  payments
                </span>
                <p><span className="jobspace">{selectedJob.job_salary}</span></p>
              </div>
              <div className="applybtn">
                <button className='btn btn-primary' onClick={() => setShowApplyModal(true)}>
                  Apply
                  <span id='oo' className="material-symbols-outlined">open_in_new</span>
                </button>

                <button className='btn btn-success' onClick={() => saveJob(selectedJob.id, data.id)}>Save</button>

              </div>
            </div>
          )}
          {selectedJob && (
            <div className="jobdescription">
              <h1>About the job</h1>
              {data.id}
              <div className="aboutjobdetails">
                {selectedJob.job_description}
              </div>
              <div className="preferredQualification">
                <h5>Preferred qualifications:</h5>
                <p>
                  {selectedJob.preferred_qualification}
                </p>
              </div>
              <div className="responsibilities">
                <h5>Responsibilities</h5>
                <p>
                  {selectedJob.job_Responsibilities}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="applicationText">
              <Form.Label>Skills</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={applicationText} 
                onChange={(e) => setApplicationText(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="resumeFile">
              <Form.Label>Upload Resume</Form.Label>
              <Form.Control 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange} 
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Apply
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Homepage;
