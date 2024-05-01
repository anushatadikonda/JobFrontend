import React, { useState } from 'react';
import axios from 'axios';
import Lannavbar from './Lannavbar';

function Forgotpassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', {
        email: email
      });
      console.log(response.data);
      alert("email sended successfully")
      // Optionally, show a success message to the user
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server Error:', error.response.data);
        setError('Server Error. Please try again later.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Network Error:', error.request);
        setError('Network Error. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setError('Error. Please try again later.');
      }
    }
  };

  return (
    <>
      <div>
        <Lannavbar />
        <section className="signupForm">
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="formControl">
                <label htmlFor="Email">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email.."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="signupbtn">
              <button type="submit" className="btn btn-primary">
                Send OTP
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </section>
      </div>
    </>
  );
}

export default Forgotpassword;
