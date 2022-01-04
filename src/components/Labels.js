import React from 'react';
import '../styles/index.css'
import '../styles/issue.css'

// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
function Labels() {
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
            <div className='newIssue'>
                <a href='/NewLabel' className='btn btn-success issueBtn'>
                    add new label
                </a>
            </div>
            <br />
            <div className='containerLabel'>
                <table className='table' >
                    <thead className='head'>
                        <tr className='headName'>
                            <td>
                                <b>labels</b>
                            </td>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        <tr>
                            <td>
                                <a className='labelName'>
                                    labelName
                                </a>
                            </td>
                            <td>
                                <a className='labelDesc'>
                                    labelDesc
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Labels;
