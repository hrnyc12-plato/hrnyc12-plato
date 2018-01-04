import React from 'react';

const AttendeeList = ({attendees}) => (
  <ul className="attendeeList">
    <h4> Current Attendees: </h4>
    {attendees.map((attendee) => (
    <li key={attendee.phoneNumber}>
      <span className="attendeeName">
        { attendee.firstName + ' ' + attendee.lastName }
      </span>,
      <span className="attendeePhoneNumber">
        { ' ' + attendee.phoneNumber }
      </span>
    </li>))}
  </ul>
);

export default AttendeeList;