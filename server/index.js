var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('../database-mysql');
var User = require('../database-mysql/models/user');
var Event = require('../database-mysql/models/event');
var openTable = require('./openTableAPI.js').openTableAPI
var coll = require('../database-mysql/collections/users.js')
var controller = require('../database-mysql/controllers/userController');
var Users = require('../database-mysql/collections/users.js')
var axios = require('axios')
var request = require('request');
var firebase = require('firebase')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


firebase.initializeApp(process.env._firebase)
var database = firebase.database()
var ref = database.ref('Rooms/tester/alex')

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.put('/user', controller.put);
app.post('/user', (req, res) => controller.post(req, res, twilioText));

app.post('/openTable', (req, res) => {
  openTable(req.body, (data) => {
    // console.log('inside server', data)
    res.send(data)
  })
  })

app.post('/server/lyft', (req, res) => {
  console.log('heres the shiittttt we neeeeeddddd', req.body)
  var headers = {
    'Content-Type': 'application/json'
};

var dataString = {"grant_type": "client_credentials", "scope": "public"};

var token = axios.create({
    headers: headers,
    auth: {
        username: process.env._lyftUser,
        password: process.env._lyftPass
    }

})



token.post('https://api.lyft.com/oauth/token', dataString).then((data) => {
  var USER_TOKEN = data.data.access_token;
  var AuthStr = 'Bearer '.concat(USER_TOKEN);
// ?end_lng=-74.0101&start_lng=-73.9764&end_lat=40.7066&start_lat=40.7505
  var lyft = axios.create({
    headers: { Authorization: AuthStr },
    params: {
      start_lat: req.body.user.lat,
      start_lng: req.body.user.lng,
      end_lat: req.body.event.lat,
      end_lng: req.body.event.lng,
    }
  })

  lyft.get('https://api.lyft.com/v1/cost').then((data) => {

    res.send(data.data)
  }).catch((err) => {
    console.log(err)
    res.send('no bueno')
  })
}).catch((err) => console.log(err))

})


app.post('/server/chatMessages', (req, res) => {
  var testRef = database.ref('Rooms/'+req.body.room+'/messages')
  testRef.once("value").then((snapshot) => {
  // console.log('TESTING .valua', snapshot.val())
  var obj = snapshot.val()
  var messages = []
  var keys = Object.keys(obj)
  keys.map((val) => {
    var test = obj[val]
    messages.push(obj[val])
  })
  res.send(messages)

  })
})




const client = require('twilio')(process.env._twilioAcct, process.env._twilioAPI);

var twilioText = (user) => {
   // console.log('userObj',user);
   client.messages.create({
         to: `+1${user.attributes.phoneNumber}`,
        from: '+16174405251',
        body: `Hey ${user.attributes.firstName} ${user.attributes.lastName}, you've been invited to my event. Please click on the link below to share your location:
        https://cryptic-sierra-35788.herokuapp.com/#/event/${user.attributes.eventId}?userId=${user.id}`,
    })
    .then((message) => console.log('testing', message.sid))
    .catch((err) => {
      console.error('Could not notify administrator');
      console.error(err);
    });
};

app.post('/userEvents', (req, res) => {
    User.query((qb) => {
      qb.select('*').from('users').where({
        firstName: req.body.name,
        phoneNumber: req.body.number
      })
      .then((response) => {
        res.send(response);
      })
    })
});

app.post('/usersEvents', (req, res) => {
  let promises = [];
  req.body.enteredUserInfo.forEach((user) => {
    Event.query((qb) => {
      promises.push(qb.select('*').from('events').where({
        id: user.eventId
      }))
    })
  })
  Promise.all(promises)
  .then((result) => {
    res.send(result);
  })
})

app.post('/eventAttendees', (req, res) => {
  let promises = [];
  req.body.enteredUsersEvents.forEach((evt) => {
    User.query((qb) => {
      promises.push(qb.select('*').from('users').where({
        eventId: evt.id
      }))
    })
  })
    Promise.all(promises)
    .then((result) => {
      console.log("SERVER SIDE RESULT ATTENDEES", result);
    res.send(result);
  })
})


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
  // console.log('the attendees should include the organizer', attendees);

  controller.insert(attendees, event, twilioText)
    .then(() => res.sendStatus(200));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', function(socket) {
  let roomName = '';
  console.log('server: a user is connected');
  socket.on('room', (room) => {
    roomName = room;
    socket.join(room);
  });
  socket.on('chat message', function(msg) {

    // console.log("MESSAGE", msg);
    var ref = database.ref('Rooms/'+roomName+'/messages')
    ref.push(msg)
    io.sockets.in(roomName).emit('chat message', msg);
  });
  socket.on('disconnect', function(socket) {
    console.log('a user has disconnected');
  });
});



http.listen(port, function() {
  console.log('listening on port,', port);
});
