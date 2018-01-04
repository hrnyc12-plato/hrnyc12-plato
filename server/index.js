var express = require('express');
var bodyParser = require('body-parser');
var keys = require('../config.js');
var db = require('../database-mysql');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/test', (req, res) => {
  res.send('hello world');
})

app.listen(port, function() {
  console.log('listening on port,', port);
});

//THIS WILL BE USED in the ASYNC DB CALLS TO SEND THE 
//URL AFTER EACH USER IS SAVED AND THE EVENT IS CREATED
// const client = require('twilio')(keys.accountSid, keys.authToken);
// client.messages
//   .create({
//     to: '+1',
//     from: `${keys.twilioNumber}`,
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//   })
//   .then((message) => console.log(message.sid));
