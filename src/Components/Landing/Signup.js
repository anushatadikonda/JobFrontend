import React,{useEffect, useState} from 'react'
import Lannavbar from './Lannavbar'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
function Signup() {
    const [formdata,setFormdata]=useState({
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        password: '',
        c_password: ''
    })
    const navigate=useNavigate()
    const handleChange=e=>{
        const {name,value}=e.target;
        setFormdata(setstateData=>({
            ...setstateData,
            [name]:value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formdata.password !== formdata.c_password) {
            toast.error('Password does not match');
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', formdata);
            if (response.status === 201) {
                toast.success(`😄 Signup Successful\n${formdata.lastname} ${formdata.firstname}`);
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error || error.response.data.message;
                
                if (errorMessage.includes("Duplicate entry")) {
                    toast.error('Email address or Phonenumber  already exists. Please use a different email or phonenumber.');
                } else if (errorMessage.includes("Password must contain")) {
                    toast.error('Password must contain at least one symbol, one number, and be at least 8 characters long');
                } else if (errorMessage.includes("Duplicate entry")) {
                    toast.error('Invalid phone number format. Please enter a valid phone number.');
                } else if (errorMessage === "Problem with database connection") {
                    toast.error('Problem with database connection');
                } else {
                    toast.error(errorMessage || 'An error occurred. Please try again.');
                }
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
    
    
    

    return (
        <div>
           <Lannavbar/>
            <section className="signupForm" id='signup'>
                <h1>Signup Form</h1>
                <form action="#" onSubmit={handleSubmit}>
                <div>
                    <div className="formControl">
                        <label htmlFor="Firstname">Firstname:</label>
                        <input type="text" name="firstname" value={formdata.firstname} onChange={handleChange} placeholder='Enter Firstname..'/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="Lastname">Lastname:</label>
                        <input type="text" name="lastname" value={formdata.lastname} onChange={handleChange} placeholder='Enter Lastname..'/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="Email">Email:</label>
                        <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder='Enter Email..'/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="Phonenumber">Phonenumber:</label>
                        <input type="number" name="phone_number" value={formdata.phone_number} onChange={handleChange} placeholder='Enter Phonenumber..'/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="Password">Password:</label>
                        <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder='Enter Password..' />
                    </div>
                    <div className="formControl">
                        <label htmlFor="C_password">Confirm password:</label>
                        <input type="password" name="c_password" value={formdata.c_password} onChange={handleChange} placeholder='Enter Confirm Password'/>
                    </div>
                </div>
                <div className="signupbtn">
                    <button className='btn btn-primary'>Create Account</button>
                    <span>Already have an account?<a href="/login">Login</a>&nbsp;here</span>
                </div>
                </form>
            </section>
        </div>
    )
}

export default Signup