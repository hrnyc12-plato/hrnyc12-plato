<<<<<<< HEAD
var User = require('../models/user');

const put = (req, res) => {
  let userId = req.body.userId;
  let latitude = req.body.lat;
  let longitude = req.body.lng;
=======
// var db = require('../database-mysql');
var Users = require('../collections/users');
var Events = require('../collections/events');

// partially working insert method,
// need to fix async issues because I want to be able to res.send on the server side
>>>>>>> feat/controller

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

<<<<<<< HEAD
var insert = function() {
  console.log('insert functino invoked')
  knex('users').insert({
    id: 1,
    firstName: 'Hoang',
    lastName: 'Nguyen',
    phoneNumber: 9168959755,
    image: 'banana',
    latitude: 3.33,
    longitude: 3.33,
  })
  .then((results) => console.log(results))
}
=======
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
    // res.send();
    })
  }
>>>>>>> feat/controller

module.exports.put = put;
exports.insert = insert;
