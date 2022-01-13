import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import Header from '../components/Header'
import Toolbar from '../components/Toolbar';
import { useEffect, useState } from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import axios from 'axios';
import { useNavigate } from 'react-router';

const Home = () => {
    let [labels, setLabels] = useState([]);
    let [users, setUsers] = useState([]);
    let [issues, setIssues] = useState([]);
    useEffect(() => {
        console.log("using effect")
        allIssues();
        allLabels();
        allUsers();
    },[] );

    const allIssues =   () => {
        try {
            axios.get('http://localhost:4000/all_issues/')
                .then(  (response) => {
                    console.log("getting issues", response.data)
                    setIssues(response.data)
                    console.log("issues :::::::::::::::", issues)
                }).catch((err) => {
                    console.log("erro in getting issues", err)
                })
        } catch (error) {
            console.log("erro in getting issues", error)

        }
    }
    const allLabels =   () => {
        try {
            axios.get('http://localhost:4000/all_labels/')
                .then(  (response) => {
                    console.log("getting labels", response.data)
                    setLabels(response.data)
                    console.log("labels :::::::::::::::", labels)
                }).catch((err) => {
                    console.log("erro in getting labels")
                })
        } catch (error) {
            console.log("erro in getting labels")
        }
    }

    const allUsers =   () => {
        try {
             axios.get('http://localhost:4000/all_users/')
                .then(  (response) => {
                    console.log("getting users", response.data)
                    setUsers(response.data)
                    console.log("users :::::::::::::::", users)
                }).catch((err) => {
                    console.log("erro in getting users")
                })
        } catch (error) {

        }
    }
    return (
        <div>
            <Header />
            <Toolbar />
            <div className='col-sm-11 subDiv'>
                <div>
                    <div>
                        <a href='/labels' className='p-2 btn btn-light filterBtns'>
                            <i className='fas fa-tag icons'></i>Labels 0
                        </a>
                        <button className='p-2 btn btn-light btnMilestone'>Milestones 0</button>
                    </div>
                </div>
                <div>
                    <a className='btn btn-success issueBtn' href="/new">New Issue</a>
                </div>
            </div>

            <br />
            <div className='col-sm-11 home'>
                <div className='boxHead'>
                    <div className='boxHeadContainer'>
                        <input type='checkbox' className='checkBox' />Open
                    </div>
                    <div className='boxHeadContainer2'>
                        <div className='dropdown'>
                            <button className='btn btn-secondary dropdown-toggle' id='dropdownMenuButton' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' >Labels
                            </button>
                            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                <a className='dropdown-item' href='#'>one</a>
                                <a className='dropdown-item' href='#'>one</a>
                                <a className='dropdown-item' href='#'>one</a>

                            </div>
                        </div>
                        <div className='dropdown'>
                            <button className='btn btn-secondary dropdown-toggle' id='dropdownMenuButton' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' >Assignees
                            </button>
                            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                <a className='dropdown-item' href='#'>one</a>
                                <a className='dropdown-item' href='#'>one</a>
                                <a className='dropdown-item' href='#'>one</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='boxHead' style={{display: "flex", flexDirection: "column", background: "#fff", borderRadius: '0 0 5px 5px', padding: 0, border:" 0.2px solid #d0d7de"}}>
                    {issues.map((issue) => {
                        return(
                            <div style={{display: "flex", alignItems:" baseline", padding: "5px", borderTop: "1px solid #d0d7de"}}>
                                <div>
                                    <input type='checkbox' style={{margin:'15px'}}/>
                                </div>
                                <div >
                                    <div style={{display: "flex", gap: "0.2rem",alignItems: "baseline"}}>
                                        <a href={'/comments/'+issue.id} style={{fontWeight: 400,fontSize: "25px", textDecoration: "none", color: "#000"}}> {issue.title}</a>
                                        <p style={{background:`${issue.color}`, color: "white", padding:" 2px 8px", borderRadius: "10px",  fontSize: "10px", margin: "0"}}>{issue.label}</p>
                                    </div>
                                    <p style={{margin:" auto", color: "#57606a", fontWeight: "normal"}}># {issue.id}</p>
                                    <p style={{margin:" auto", color: "#57606a", fontWeight: "normal"}}>created by {issue.creator}</p>
                                    <p style={{margin:" auto", color: "#57606a", fontWeight: "normal"}}>at {issue.created_at}</p>
                                    <p style={{margin:" auto", color: "#57606a", fontWeight: "normal"}}>Assigneed to {issue.assignee}</p>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default Home;
