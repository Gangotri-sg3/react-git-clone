import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Toolbar from './components/Toolbar';
import New from './components/New';
import Labels from './components/Labels';
import Home from './components/Home';
import NewLabel from './components/NewLabels';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div >
       <Header />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Labels" element={<Labels />} />
        <Route path="New" element={<New />} />
        <Route path="NewLabel" element={<NewLabel />} />


      </Routes>
    </div>

  );
}

export default App;
