import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Homenavbar({ onSearch }) {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    // Call the onSearch function passed from the parent component (Homepage)
    onSearch(jobTitle, location);
  };

  return (
    <div>
      <section className="homepage_nav">
        <div className="homelogo">
          <span className="material-symbols-outlined">
            work_update
          </span>
          <h2>Hired</h2>
        </div>
        
        <nav>
          <ul>
            <li><NavLink to="/homepage">Home</NavLink></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" onClick={toggleDropdown}>
                Settings
              </a>
              <div className={dropdownOpen ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                <NavLink className="dropdown-item" to="/savedjobs">Saved Jobs</NavLink>
                <div className="dropdown-divider"></div>
                <NavLink className="dropdown-item" to="/appliedjobs">Applied Jobs</NavLink>
              </div>
            </li>
            <button className='btn btn-primary' onClick={logout}>Logout</button>
          </ul>
        </nav>
      </section>
    </div>
  )
}

export default Homenavbar;
