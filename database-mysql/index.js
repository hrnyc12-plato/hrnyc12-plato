var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'wayn.ccpnt53lucxn.us-east-2.rds.amazonaws.com',
    user     : 'Administrator',
    password : 'bananas18',
    database : 'WAYN_HRNYC12',
    charset  : 'utf8'
  },
  useNullAsDefault: true
});
 
var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('events', function(event) {
      event.increments('id').primary();
      event.decimal('eventLatitude', 15, 10);
      event.decimal('eventLongitude',15, 10);
      event.string('eventName', 255);
      event.string('eventTime', 10);
    })
    .then(function(table) {
      console.log('Created events tables', table)
    })
  }
});

bookshelf.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('firstName', 255);
      user.string('lastName', 255);
      user.string('phoneNumber', 15);
      user.decimal('latitude', 15, 10);
      user.decimal('longitude', 15, 10);
      user.integer('eventId');
      user.foreign('eventId').references('event.id');
      user.timestamps(true, true);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = bookshelf;