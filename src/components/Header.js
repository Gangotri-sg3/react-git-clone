import React from 'react';
import '../styles/index.css'
import '../styles/issue.css'

// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
function Header() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div class='container-fluid container'>
                <a class='navbar-brand' href="#">
                    <img src='https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg' class='logo'/>
                </a>
                <div class='collapse navbar-collapse' id="navbarNavAltMarkup">
                    <div class='navbar-nav'>
                    <input class='form-control py-2 navSearch' id='example-search-input' type='text' placeholder='Search or jump to...'/>
                    <a class='nav-link' href='#'>Pulls</a>
                    <a class='nav-link' href='#'>Issues</a>
                    <a class='nav-link' href='#'>Marketplace</a>
                    <a class='nav-link' href='#'>Explore</a>
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
