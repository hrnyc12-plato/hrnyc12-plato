import React from 'react';

class AddAttendee extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  handleFirstNameChange (e) {
    this.setState({
      firstName: e.target.value
    });
  }

  handleLastNameChange (e) {
    this.setState({
      lastName: e.target.value
    });
  }

  handlePhoneNumberChange (e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.addNewAttendee(this.state);
  }

  render () {
    return (
      <div className="addAttendee">
        <h4>Attendee Information:</h4>
          <label>
            First Name: 
            <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} required/> 
          </label>
          <br/>

          <label>
            Last Name: 
            <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} required/> 
          </label>
          <br/>

          <label>
            Phone Number: 
            <input type="tel" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} required/> 
          </label>
          <br/>

          <button onClick={this.handleSubmit}>Add Attendee</button>
      </div>
    )
  }
}

export default AddAttendee;