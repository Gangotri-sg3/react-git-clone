import React from 'react';
import '../styles/index.css'
import '../styles/issue.css'
import  { useEffect, useState } from "react";
import e from 'cors';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';

// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
const Signin = () =>  {
    // constructor(props){
    //     super(props)
    // }
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("false");
    const [message, setMessage] = useState("null");
    const [loading, setLoading] = useState("false");

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("email :",email,"password :",password,"name :",name,'username :',username)
        setMessage(null);
        try{
            const config = {
                headers: {
                    "Content-type" : "application/json",

                }
            };
            setLoading(true);
            const { data } = await axios.post('http://localhost:4000/signup/',{name,email,password,username},config);
            setLoading(false);
            localStorage.setItem('userInfo',JSON.stringify(data));

        }catch (error){
            console.log("error in sign up : ",error);
            setError("error.response")
        }
    }

    // render() { 
    return (
        <div>
            <br />
            <br />
            <img src='https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg' className='loginImg' />
            <h3 className='logInTitle'>Sign In to Github</h3>
            <br />
            <div className='card loginCard'>
                <div className='card-body'>
                    <div className='login-box'>
                        <div className='header'>
                            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                      {loading && <Loading/>}
                        <form className='form' onSubmit={submitHandler}>
                            <div className='form-group'>
                                <label htmlFor='name' >Full Name</label>
                                <input type='text' name='name' placeholder='Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='username' >User Name</label>
                                <input type='text' name='username' placeholder='username' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='email' >E-mail</label>
                                <input type='email' name='email' placeholder='E-mail' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='password' >Password</label>
                                <input type='password' name='password' placeholder='Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <br/>
                            <button type='submit' className='btn loginButton' id='loginButton' >Sign Up</button>
                        </form>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div className='card signupCard'>
                <div className='card-body'>
                    <h6>Already Have an account ?
                        <a href="/login">Log In into account</a>
                    </h6>
                </div>
            </div>
        </div>
    )
// }

}

export default Signin;
