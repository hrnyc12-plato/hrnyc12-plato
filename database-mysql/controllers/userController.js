
var Users = require('../collections/users');
var Events = require('../collections/events');
var User = require('../models/user');


const post = (req, res, twilioText) => {
  let newUser = req.body.attendee;
  let eventId = req.body.eventId;

  // Don't add/invite user if already in DB
  new User({phoneNumber: newUser.phoneNumber})
  .fetch()
  .then((foundUser) => {
    if (!foundUser) {
      Users.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        eventId: eventId
      })
      .then((result) => twilioText(result))
      .then(() => res.sendStatus(200));
    } else {
      res.sendStatus(200);
    }
  })
}

//Updates user loc from EventMap component
const put = (req, res) => {
  let userId = req.body.userId;
  let latitude = req.body.lat;
  let longitude = req.body.lng;

  new User({id: userId})
  .fetch()
  .then((user) => {
    if (user) {
        user.set('latitude', latitude);
        user.set('longitude', longitude);
        return user.save();
    } else {
      console.error('No user found with that ID, could not update location!');
    }
  })
  .then(() => {
    res.sendStatus(200);
  });
}

// Insert new Event and attendees, then send text to all
var insert = (users, event, twilio) => {
  console.log('insert functino invoked');
  return Events.create({
    eventLatitude: event.eventLatitude,
    eventLongitude: event.eventLongitude,
    eventName: event.eventName,
    eventTime: event.eventTime
  }).then( (result) => {
      users.forEach( user => {
      Users.create({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        eventId: result.attributes.id
      }).then( (result) => twilio(result));
    })
  })
}

// Get all events for said user and return array of Event objects
// const post = ()

module.exports.put = put;
module.exports.insert = insert;
module.exports.post = post;
