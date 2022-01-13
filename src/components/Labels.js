import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import Header from '../components/Header'
import Toolbar from '../components/Toolbar';
import  { useEffect, useState } from "react";
import e from 'cors';
import axios from 'axios';
import {useNavigate} from 'react-router';


const Labels = () => {
    let [labels,setLabels] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:4000/all_labels/')
            .then((response) => { 
                console.log("getting labels",response.data)
                setLabels(response.data)
                console.log("labels :::::::::::::::",labels)
            }).catch((err) => {
                console.log("erro in getting labels")
            })
    }, []);
    

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
                        <a className='btn btn-success issueBtn' href="/new_label">add label</a>
                    </div>
                </div>
            <br />
            <div className='containerLabel'>
                <table className='table' >
                    <thead className='head'>
                        <tr className='headName'>
                            <td style={{border: "none"}}>
                                <b>labels</b>
                            </td>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                    {labels.map((label) => {
                        return (
                            <tr>
                            <td>
                                <a style={{background:`${label.color}`}} className='labelNameTable'>
                                    {label.label_name}
                                </a>
                            </td>
                            <td>
                                <a className='labelDescTable'>
                                    {label.description}
                                </a>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Labels;
