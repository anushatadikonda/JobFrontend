import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import Lannavbar from './Lannavbar'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('http://127.0.0.1:5000/login',{email,password});
            if(response.status===200){
                localStorage.setItem('access_token',response.data.access_token)
                navigate(getRoles(response.data.user_role))
                toast.success(`LoginSucessful, ${response.data.firstname}`)
            }
        }
        catch(error){
            toast.error("email or password error")
        }
    }

    const getRoles=(user_role)=>{
        console.log(user_role);
        switch(user_role){
            case 'user':
                return '/homepage'
            case 'admin':
                return '/admin_page'
            case 'recruiter':
                return '/recruiterpage'
            default:
                return '/'
        }
    }
    return (
        <div>
            <Lannavbar />
            <section className="signupForm">
                <h1>Login Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="formControl">
                            <label htmlFor="Email">Email:</label>
                            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email..' />
                        </div>
                        <div className="formControl">
                            <label htmlFor="Password">Password:</label>
                            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password..'  />
                        </div>
                    </div>
                    <div className="signupbtn">
                        <button className='btn btn-primary'>Login</button>
                        <p style={{ marginTop: '10px' }}>Don’t have an account?<NavLink to="/signup">Signup</NavLink>&nbsp;here</p>
                        <NavLink to="/fpassword">Forgot password?</NavLink>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default Login