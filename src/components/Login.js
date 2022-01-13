import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import e from 'cors';
import axios from 'axios';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import {useNavigate} from 'react-router';
import { useEffect, useState } from "react";




// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("false");
    const [message, setMessage] = useState("null");
    const [loading, setLoading] = useState("false");
        let [users, setUsers] = useState([]);
        let [logInStatus, setLoginStatus] = useState(false);


    const navigate = useNavigate();


   

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("email :", email, "password :", password)
        // try{
             axios.post('http://localhost:4000/login/',{email,password}).then((res) =>{
                 if(!res.data.auth){
                    console.log("res.data message",res.data.message)
                     setLoginStatus(false);
            navigate("/login");

                 }else{
                     console.log("res.data",res.data)
                     console.log("res.data username",res.data.result[0].name)
                     setLoginStatus(true);
                     localStorage.setItem('token',res.data.token)
                     navigate("/");

                 }
             }).catch((err) => {
                console.log("err",err)
                navigate("/login");
                setLoginStatus(false);

             })
    }

    const isAuthenticated = () => {
        axios.get('http://localhost:4000/login/is_user_auth',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            },
        }).then((res) => {
            console.log("authenticated",res)
        })
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
                            {/* {error && <ErrorMessage variant='danger'/>} */}

                            {!loading && <Loading/>}
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
                    {users.map((user) => {
                                return (
                                    <img src={user.profile} alt="BigCo Inc. logo"/>
                                )
                            })}
                </div>
            </div>
        </div>
    )
}

export default Login;