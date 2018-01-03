var db = require('../database-mysql');

// to be called on server side

// takes firstName, lastName and phoneNumber, queries the db for an instance already there
// if no match, inserts new user instance to db.
let user = {
  firstName: 'Rick',
  lastName: 'Sanchez',
  phoneNumber: 1234567890
}
var insertUser = (user) => { 
  User.find({ where: { id: id } });
}