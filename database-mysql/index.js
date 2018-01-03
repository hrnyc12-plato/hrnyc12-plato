var mysql = require('mysql');


const Sequelize = require('sequelize');
const sequelize = new Sequelize('eventsdb', 'awuser', 'testpass', {
  host: 'mydbinstance.ci9qnmyzcttt.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

var User = sequelize.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phoneNumber: Sequelize.INTEGER
});

sequelize.sync({force: true})
  .then(() => User.create({
    firstName: 'madi',
    lastName: 'crocker',
    phoneNumber: '2018675309'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });


// connection.connect(function(err){

//   if(!err) {
//       console.log("Database is connected ... ");    
//   } else {
//       console.log("Error connecting database ... ");    
//   }
//   });

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
