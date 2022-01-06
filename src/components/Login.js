import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import  { useEffect, useState } from "react";
import e from 'cors';
import axios from 'axios';


// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("false");
    const [message, setMessage] = useState("null");
    const [loading, setLoading] = useState("false");

    const submitHandler = async() => {
        console.log("email :",email,"password :",password)
        e.preventDefault();
        try{ 
            const config = {
                headers: {
                    'Content-type':'application/json'
                }
            }
            setLoading(true);
            const { data } = await axios.post('http://localhost:4000/login/',{email,password},config);
            setLoading(false);
            console.log("data ::",data)
            localStorage.setItem('userInfo',JSON.stringify(data))
        }catch (err){
            console.log("err in login :",err);
            setError("error in log in")
        }
    }
    
    return (
        <div>
            <br />
            <br />
            <img src='https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg' className='loginImg' />
            <h3 className='logInTitle'>Log in to Github</h3>
            <br />
            <div className='card loginCard'>
                <div className='card-body'>
                    <div className='login-box'>
                        <div className='header'>
                        <form className='form' onSubmit={submitHandler}>
                            <div className='form-group'>
                                <label htmlFor='email' >E-mail</label>
                                <input type='email' name='email' placeholder='E-mail' className='form-control'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='password' >Password</label>
                                <input type='password' name='password' placeholder='Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <br/>
                            <button type='submit' className='btn loginButton' id='loginButton' >Login</button>
                        </form>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div className='card signupCard'>
                <div className='card-body'>
                    <h6>New to Github?
                        <a href="/signin">Create an account</a>
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default Login;
