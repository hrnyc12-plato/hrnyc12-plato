import React from 'react';
import AttendeeListItem from './AttendeeListItem.jsx';

const AttendeeList = ({attendees, deleteAttendee, eventName}) => (
    <ul className="attendeeList">
      {attendees.map((attendee, key) => (
        <AttendeeListItem key={attendee.phoneNumber} attendee={attendee} deleteAttendee={deleteAttendee} />
      ))}
    </ul>
);

export default AttendeeList;
