var express = require('express');
var bodyParser = require('body-parser');

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

