import React from 'react';

const AttendeeListItem = ({attendee, deleteAttendee}) => {

  const handleButtonClick = () => {
    deleteAttendee(attendee);
  }

  return (
    <li>
      <span className="attendeeName">
        { attendee.firstName + ' ' + attendee.lastName }
      </span>,
      <span className="attendeePhoneNumber">
        { ' ' + attendee.phoneNumber }
      </span>
      <button onClick={handleButtonClick}>Delete</button>
    </li>
  )
}

export default AttendeeListItem;