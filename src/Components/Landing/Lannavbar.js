import React from 'react'
import {useNavigate,Link} from 'react-router-dom'

function Lannavbar() {
    const navigate=useNavigate();
    return (
        <div>
            <div className="lan_navbar">
                <div className="logo">
                    <span class="material-symbols-outlined">
                        work_update
                    </span>
                    <h2>Hired</h2>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <a href="#aboutus">About Us</a>
                    <a href="">Categories</a>
                </nav>
                <div className="buttons">
                    <button onClick={() => navigate('/signup')}>Signup</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Lannavbar