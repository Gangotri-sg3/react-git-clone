import React from 'react';
import '../styles/index.css'
import '../styles/issue.css';
import Header from '../components/Header'
import Toolbar from '../components/Toolbar';

// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
function New() {
    return (
        <div>
            <Header />
            <Toolbar />
            <div>
                <h1>
                    Hi new
                </h1>
            </div>
        </div>
    )

}

export default New;
