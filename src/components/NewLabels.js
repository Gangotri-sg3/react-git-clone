import React from 'react';
import '../styles/index.css'
import '../styles/issue.css'

// navbar.navbar-expand-lg.navbar-dark.bg-dark.nav
class NewLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        console.log("states ::::",this.state)
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
          console.log("even in handle change :",event)
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
    render() { 
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
            <form className='postLabel' onSubmit='this.handleSubmit'>
                <div className='col-sm-1'>
                    <div className='col-sm-9 newLabel'>
                        <input type='text' placeholder='Label Name' name='label_name' className='newLabelName' value={this.state.value} onChange={this.handleChange} />
                        <input type='text' placeholder='description' name='description' className='newLabelDesc' value={this.state.value} onChange={this.handleChange} />
                        <input type='text' placeholder='color' name='color' className='newLabelDesc' value={this.state.value} onChange={this.handleChange}/>
                        <input className='btn btn-success btnlabelsubmit' type="submit" value="Create a label" />

                    </div>
                </div>
            </form>
        </div>
    )
}
}

export default NewLabel;
