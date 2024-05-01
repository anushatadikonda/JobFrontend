import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Lannavbar from './Lannavbar';

function UpdatePassword() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Password validation logic can be added here

      const response = await axios.post('http://localhost:5000/reset-password', {
        email: email,
        token: token,
        password: password,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}` // Include JWT token in headers
        }
      });

      setSuccessMessage(response.data.message); // Show success message
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'Error updating password. Please try again later.');
      } else {
        setError('Error updating password. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 201) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching user data. Please try again later.');
      }
    }
  };

  return (
    <div>
      <Lannavbar />
      <section className="signupForm">
        <h1>Update Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="formControl">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="formControl">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="formControl">
              <label htmlFor="confirmPassword">Confirm password:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="signupbtn">
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </section>

   
    </div>
  );
}

export default UpdatePassword;
