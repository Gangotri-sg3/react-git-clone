import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import 'fa-icons';

// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
function Toolbar() {
    return (
        <div>
        <div className='toolbar'>
            <div className='container'>
                <div className='row'>
                    <div className='margin-top:20px'>
                        <a className='projTitle'>
                            Project_Name
                        </a>
                    </div>
                </div>
                <br/>
                <br/>
                <div className='row tabs'>
                    <div className='col-sm issueTab'>
                        <i className='far fa-scrubber'> </i>
                        <p>
                            Issues
                        </p>
                    </div>
                    <div className='col-sm issueTab'>
                        <i className='far fa-scrubber'> </i>
                        <p>
                            Pull Request
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <hr className='line'></hr>
               </div>
    )
}

export default Toolbar;
