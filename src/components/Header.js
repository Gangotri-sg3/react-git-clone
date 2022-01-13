import React from 'react';
import '../styles/index.css'
import '../styles/issue.css'

// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div className='container-fluid container'>
                <a className='navbar-brand' href="#">
                    <img src='https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg' className='logo'/>
                </a>
                <div className='collapse navbar-collapse' id="navbarNavAltMarkup">
                    <div className='navbar-nav'>
                    <input className='form-control py-2 navSearch' id='example-search-input' type='text' placeholder='Search or jump to...'/>
                    <a className='nav-link' href='#'>Pulls</a>
                    <a className='nav-link' href='#'>Issues</a>
                    <a className='nav-link' href='#'>Marketplace</a>
                    <a className='nav-link' href='#'>Explore</a>
                    </div>
                </div>
                <div>
                    <a href='/login' className='logInLink'>
                        Login
                    </a>
                </div>
            </div>
        </nav>
    )

}

export default Header;
