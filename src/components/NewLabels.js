import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import Header from '../components/Header'
import Toolbar from '../components/Toolbar';
import  { useEffect, useState } from "react";
import e from 'cors';
import axios from 'axios';
import {useNavigate} from 'react-router';

const NewLabel = () => {
    const [label_name, setLabel_name] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    let [labels,setLabels] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:4000/all_labels/')
            .then((response) => { 
                console.log("getting labels")
                setLabels(response.data)
            }).catch((err) => {
                console.log("erro in getting labels")
            })
    }, []);
    
    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("name :",label_name,"description :",description,"color :",color)
        try{
            const { data } = await axios.post('http://localhost:4000/labels/',{label_name,description,color});
            navigate("/labels");
        }catch (error){
            console.log("error in sign up : ",error);
            navigate("/login");
        }
    }
    
    return (
        <div>
             <Header />
      <Toolbar />
            <form className='postLabel' onSubmit={submitHandler}>
                            <input type='text' placeholder='Label Name' name='label_name' className='newLabelName' value={label_name} onChange={(e) => setLabel_name(e.target.value)}/>
                            <input type='text' placeholder='description' name='description' className='newLabelDesc' value={description} onChange={(e) => setDescription(e.target.value)}/>
                            <input type='text' placeholder='color' name='color' className='newLabelDesc' value={color} onChange={(e) => setColor(e.target.value)}/>
                            <button type='submit' className='btn btn btn-success btnlabelsubmit' id='newLabelButton' >Add label</button>
                        </form>
            <br/>
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

export default NewLabel;
