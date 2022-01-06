import logo from './logo.svg';
import './App.css';

import New from './components/New';
import Labels from './components/Labels';
import Home from './components/Home';
import NewLabel from './components/NewLabels';
import Login from './components/Login';
import Signin from './components/Signin';
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogginActive:true,
    }
}
  render() { 
    const { isLogginActive } = this.state;
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="labels" element={<Labels />} />
        <Route path="new" element={<New />} />
        <Route path="new_label" element={<NewLabel />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </div>
  );
}
}

export default App;
