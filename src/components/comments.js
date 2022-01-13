import React from 'react';
import '../styles/index.css';
import '../styles/issue.css';
import Header from '../components/Header'
import Toolbar from '../components/Toolbar';
import { useEffect, useState } from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import axios from 'axios';
import { useNavigate } from 'react-router';

const Comments = () => {
  const mdEditor = React.useRef(null);
  const [description, setDescription] = React.useState("");
  let [labels, setLabels] = useState([]);
  let [users, setUsers] = useState([]);
  let [issue, setIssues] = useState([]);
  let [currentId, setCurretId] = useState();
  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setDescription(newValue);
  };
  const [label_id, setLabel] = useState('');
  const [assignee_id, setAssignee] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    console.log("using effect", window.location.pathname.slice(10))
    setCurretId(window.location.pathname.slice(10))
    allComments();
  }, []);

  const allComments = () => {
    try {
      axios.get(`http://localhost:4000/comments/${window.location.pathname.slice(10)}`)
        .then((response) => {
          console.log("getting issue", response.data)
          setIssues(response.data)
          console.log("setIssues :::::::::::::::", response.data)
        }).catch((err) => {
          console.log("erro in getting issue")
        })
    } catch (error) {

    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("title ")
    try {
        const { data } = await axios.post('http://localhost:4000/addComment/', { "id":window.location.pathname.slice(10), "comment":description,'label_id':0,"posted_by":issue[0].creator});
        navigate("/");
    } catch (error) {
        console.log("error in sign up : ", error);
        navigate(`/comments/${window.location.pathname.slice(10)}`);
    }
  }
  
  return (
    <div>
      <Header />
      <Toolbar />
     { issue && issue.length >0 &&<div className='container'>
        <div className='row'>
          <div>
                  <div>
                    <div style={{ display: "flex", letterSpacing: "0.5px", gap: "0.4rem" }}>
                      <h2>
                        {issue[0].title}
                      </h2>
                      <h2 style={{ color: "#57606a" }}>
                        #{issue[0].id}
                      </h2>
                    </div>
                    <hr />
                    <div className='row'>
                      <div className='col-sm-2'>
                        <h2 style={{ fontFamily: "italic" }}>
                          {issue[0].creator}
                        </h2>
                      </div>
                      <div className='col-sm-8'>
                        <table className='table' style={{ borderCollapse: 'separate', borderSpacing: "0" }}>
                          <thead>
                            <tr>
                              <td scope='col' style={{ border: "1px solid #a6d9ff", borderRadius: "5px 5px 0 0" }}>{issue[0].title}</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope='row' style={{ border: "1px solid #a6d9ff", borderRadius: "5px 5px 0 0" }}> {issue[0].description}</td>
                            </tr>
                            <tr>
                              <td scope='row' style={{ border: "none", background:"transparent",borderRadius: "5px 5px 0 0" }}> {issue[0].label_creator} Created <h6> {issue[0].label}</h6> at {issue[0].label_createdat}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='col-sm-8' >
                      {issue.map((issue) => {
                   return(
                     <div >
                     <div className='col-sm-8'>
                        <h2 style={{ fontFamily: "italic" }}>
                          {issue.user_posted_by}
                        </h2>
                      </div>
                      <div className='col-sm-8'>
                        <table className='table' style={{ borderCollapse: 'separate', borderSpacing: "0" }}>
                          <thead>
                            <tr>
                              <td scope='col' style={{ border: "1px solid #a6d9ff", borderRadius: "5px 5px 0 0" }}>{issue.user_posted_by}</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope='row' style={{ border: "1px solid #a6d9ff", borderRadius: "5px 5px 0 0" }}> {issue.comment}</td>
                            </tr>
                          </tbody>
                        </table>
                     </div>
                     </div>
                   )
                    })}
                    </div>
                      <div className='col-sm-2'>
                        <select value={label_id} className='form-select' name='label' onChange={(e) => setLabel(e.target.value)}>
                          <option value="0">Labels</option>
                          <option value="1" style={{ background: `${issue[0].color}`, color: "#57606a", borderRadius: "30px" }} >{issue[0].label}</option>
                        </select>
                        <hr />
                        <select value={assignee_id} className='form-select' name='assignee' onChange={(e) => setAssignee(e.target.value)}>
                          <option value="0">Assignees</option>
                          <option value="1">{issue[0].assignee}</option>
                        </select>
                      </div>
                      <div className='col-sm-2'>
                      </div>
                      <div className='col-sm-8'>
                        <form className='issueForm'  onSubmit={submitHandler}>
                          <div className=' newIssue'>
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
                          <br />
                          <br />
                          <button type='submit' className='btn btn-success btnSubmit' style={{ marginTop: "50px" }}  >Add comment</button>
                        </form>
                      </div>
                    </div>
                  </div>
                )
          </div>

        </div>

      </div>
      }
    </div>
  )

}

export default Comments;
