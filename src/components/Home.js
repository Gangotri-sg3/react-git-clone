import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import Toolbar from '../components/Toolbar';


// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
function Home() {
    return (
     <div>
      <div className='col-sm-11 subDiv'>
                    <a href='/Labels' className='p-2 btn btn-light filterBtns'>
                    <i className='fas fa-tag icons'>
                    Lables 0
                    </i>
                    <button className='p-2 btn btn-light btnMilestone '>
                    MileStones
                    </button>
                    </a>
        </div>
        <div className= 'newIssue'>
                    <a href='/New' className='btn btn-success issueBtn'>
                    New Issue
                    </a>
                </div>

        <br/>
        <br/>
        <div className='col-sm-11 home'>
        <div className='boxHead'>
            <div className='boxHeadContainer'>
            <input type='checkbox' className='checkBox'/>Open
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
        </div>
     </div>
    )

}

export default Home;
