import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const AttendeeListItem = ({attendee, deleteAttendee}) => {

  const handleButtonClick = () => {
    deleteAttendee(attendee);
  }

  return (
    <Chip onRequestDelete={handleButtonClick}>
      {attendee.firstName + ' ' + attendee.lastName + ', ' + attendee.phoneNumber}
    </Chip>
  )
}

export default AttendeeListItem;
