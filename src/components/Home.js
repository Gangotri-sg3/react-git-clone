import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import Header from '../components/Header'
import Toolbar from '../components/Toolbar';


// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
function Home() {
    return (
     <div>
           <Header />
      <Toolbar />
                <div className='col-sm-11 subDiv'>
                    <div>
                        <input type='text' placeholder='Search' className='filterSearch'/>
                    </div>
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
