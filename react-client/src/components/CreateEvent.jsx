import React from 'react';
import axios from 'axios';
import AddAttendee from './AddAttendee.jsx';
import AttendeeList from './AttendeeList.jsx';
import MapWithSearchBox from './MapWithSearch.jsx';

class CreateEvent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      eventName: '',
      location: {
        lat: '',
        lng: '',
      },
      organizerFirstName: '',
      organizerLastName: '',
      organizerPhoneNumber: '',
      time: '',
      attendees: []
    }
    
    this.handleEventNameChange = this.handleEventNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewAttendee = this.handleNewAttendee.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }
  
  handleLocationChange (location) {
    this.setState({
      location: location
    });
  }

  handleEventNameChange (e) {
    this.setState({
      eventName: e.target.value
    });
  }

  handleTimeChange (e) {
    this.setState({
      time: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log('Submitting, contents of state:', this.state);
    axios.post('/event', this.state).then((response) => console.log(response));
  }

  handleNewAttendee (attendee) {
    this.setState({
      attendees: [...this.state.attendees, attendee]
    });
  }

  handleFirstNameChange (e) {
    this.setState({
      organizerFirstName: e.target.value
    });
  }

  handleLastNameChange (e) {
    this.setState({
      organizerLastName: e.target.value
    });
  }

  handlePhoneNumberChange (e) {
    this.setState({
      organizerPhoneNumber: e.target.value
    });
  }

  render () {
    return (
      <div className="createEvent">
        <h4> Event Details </h4>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event Name:
            <input type="text" value={this.state.eventName} onChange={this.handleEventNameChange} required/>
          </label>
          <br/>

          <label>
            Time:
            <input type="time" value={this.state.time} onChange={this.handleTimeChange} required/>
          </label>
          <br/>
          <MapWithSearchBox getEventCoordinate={this.handleLocationChange}/>

          <br/>
          <br/>
          Organizer Info:
          <br/>

          <label>
            First Name: 
            <input type="text" value={this.state.organizerFirstName} onChange={this.handleFirstNameChange} required/> 
          </label>
          <br/>

          <label>
            Last Name: 
            <input type="text" value={this.state.organizerLastName} onChange={this.handleLastNameChange} required/> 
          </label>
          <br/>

          <label>
            Phone Number: 
            <input type="tel" value={this.state.organizerPhoneNumber} onChange={this.handlePhoneNumberChange} required/> 
          </label>
          <br/>

          <input className="createEventButton" type="submit" value="Create Event" />
        </form>
        <br/>
          <div className="attendeeInfo">
            <AddAttendee addNewAttendee={this.handleNewAttendee} />
            <AttendeeList attendees={this.state.attendees} />
          </div>
      </div>
    );
  }
}

export default CreateEvent;