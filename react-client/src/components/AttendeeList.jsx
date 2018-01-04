import React from 'react';
import AttendeeListItem from './AttendeeListItem.jsx';

const AttendeeList = ({attendees, deleteAttendee}) => (
  <ul className="attendeeList">
    <h4> Current Attendees: </h4>
    {attendees.map((attendee, key) => (
      <AttendeeListItem key={attendee.phoneNumber} attendee={attendee} deleteAttendee={deleteAttendee} />
    ))}
  </ul>
);

export default AttendeeList;