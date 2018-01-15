// import { read } from 'fs';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// var keys = require('../config.js');
var db = require('../database-mysql');
var User = require('../database-mysql/models/user');
var Event = require('../database-mysql/models/event');

var coll = require('../database-mysql/collections/users.js')
var controller = require('../database-mysql/controllers/userController');
var Users = require('../database-mysql/collections/users.js')

var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.put('/user', controller.put);
app.post('/user', (req, res) => controller.post(req, res, twilioText));

const client = require('twilio')(process.env.accountSid, process.env.authToken);

// below would actually be put inside the post, but I used the test route to make sure this worked

var twilioText = (user) => {
  console.log('userObj',user);
  client.messages.create({
        to: `+1${user.attributes.phoneNumber}`,
        from: '+12408235168',
        body: `Hey ${user.attributes.firstName} ${user.attributes.lastName}, you've been invited to my event. Please click on the link below to share your location:
        https://wayn-greenfield.herokuapp.com/#/event/${user.attributes.eventId}?userId=${user.id}`,
    })
    .then((message) => console.log('testing', message.sid))
    .catch((err) => {
      console.error('Could not notify administrator');
      console.error(err);
    });
};

app.get('/event', (req, res) => {
  var eventId = req.param('eventId');
  new Event({'id': eventId})
    .fetch()
    .then(function(eventData){
      User.query(function(qb) {
        qb.where('eventId','=', eventId).andWhere('latitude', '!=', 'NULL')
      })
      .fetchAll()
      .then(function(users) {
        res.send({ users:users, event: eventData })
      });
    });
});


app.post('/event', (req, res) => {
  console.log('data from the client', req.body);
  let organizer = {
    firstName: req.body.organizerFirstName,
    lastName: req.body.organizerLastName,
    phoneNumber: req.body.organizerPhoneNumber
  };

  let event = {
    eventLatitude: req.body.location.lat,
    eventLongitude: req.body.location.lng,
    eventName: req.body.eventName,
    eventTime: req.body.time
  };

  let attendees = req.body.attendees;
  attendees.push(organizer);
  console.log('the attendees should include the organizer', attendees);

  controller.insert(attendees, event, twilioText)
    .then(() => res.sendStatus(200));
});


app.listen(port, function() {
  console.log('listening on port,', port);
});
