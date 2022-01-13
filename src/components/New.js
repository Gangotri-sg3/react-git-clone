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
// import jwt from 'jsonwebtoken'



const New = () => {
    const [title, setTitle] = useState("");
    const mdEditor = React.useRef(null);
    const [description, setDescription] = React.useState("");
    const [label_id, setLabel] = useState('');
    const [assignee_id, setAssignee] = useState('');
    const handleEditorChange = ({ html, text }) => {
        const newValue = text.replace(/\d/g, "");
        setDescription(newValue);
    };
    let [labels, setLabels] = useState([]);
    let [users, setUsers] = useState([]);
    let [comments, setComments] = useState('');
    let [is_open, setIsOpen] = useState(true);
    let [is_auth, setIsAuth] = useState(false);
    let [currentUser,setCurrentUser] = useState('')


    let [logInStatus, setLoginStatus] = useState(false);



    const navigate = useNavigate();

    useEffect(async () => {
        console.log("using effect")
         allLabels();
        allUsers();
        isAuthenticated();
        getLoginDetails();
    }, []);

    const allLabels = async () => {
        try {
            axios.get('http://localhost:4000/all_labels/')
                .then(async (response) => {
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
    const allUsers = async () => {
        try {
             axios.get('http://localhost:4000/all_users/')
                .then(async (response) => {
                    console.log("getting users", response.data)
                    setUsers(response.data)
                    console.log("users :::::::::::::::", users)
                }).catch((err) => {
                    console.log("erro in getting users")
                })
        } catch (error) {

        }
    }
    const isAuthenticated = () => {
        axios.get('http://localhost:4000/is_user_auth',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            },
        }).then((res) => {
            console.log("authenticated",res)
            if(res.data == "authenticated"){
                setIsAuth(true)
            }else{
                setIsAuth(false)
            }
        }).catch((err) => {
            setIsAuth(false)
        })
    }
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    let userName ;
    const getLoginDetails = () => {
        let token = localStorage.getItem('token');
        let decoded = parseJwt(token)
        console.log("decoded :: ",decoded.user)
        setCurrentUser(decoded.user)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("user name in handler",userName)

        console.log("title :", title, "description :", description, "label_id :", label_id, "assignee_id :", assignee_id, "comments ::", comments, "creator", currentUser, "is_open :", is_open)
        try {
            const { data } = await axios.post('http://localhost:4000/issues/', { title, description, label_id, assignee_id, currentUser, comments, is_open });
            navigate("/");
        } catch (error) {
            console.log("error in sign up : ", error);
            navigate("/new");
        }
    }
    // if(readyForRender){ 
    return (
        <div>
            <Header />
            <Toolbar />
            <div>
                <form className='issueFormNew' onSubmit={submitHandler}>
                    <div className=' newIssueDiv'>
                        <input type='text' name='title' placeholder='title' className='form-control issueTitle' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <br />
                        <Editor
                            ref={mdEditor}
                            value={description}
                            style={{
                                height: "300px"
                            }}
                            name='description'
                            className='form-control description'
                            onChange={handleEditorChange}
                            renderHTML={text => <ReactMarkdown source={text} />}
                        />
                    </div>
                    <div className='newIssue2'>
                        <select value={label_id} className='form-select' name='label' onChange={(e) => setLabel(e.target.value)}>
                            <option value="0">Labels</option>
                            {labels.map((label) => {
                                return (
                                    <option style={{ background: `${label.color}`, color: "#57606a", borderRadius: "30px" }} value={label.id}>{label.label_name}</option>
                                )
                            })}
                        </select>
                        <br />
                        <select value={assignee_id} className='form-select' name='assignee' onChange={(e) => setAssignee(e.target.value)}>
                            <option value="0">Assignees</option>
                            {users.map((user) => {
                                return (
                                    <option value={user.id}>{user.username}</option>
                                )
                            })}
                        </select>
                    </div>
                    <br />
                    <br />
                    <button type='submit' className='btn btn-success btnSubmit'  >Submit new issue</button>
                </form>
            </div>
        </div>
    )
    // }
}

export default New;
