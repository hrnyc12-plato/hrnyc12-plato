var db = require('../index');

var User = bookshelf.Model.extend({
    tableName: 'events'
  });

module.exports = Event;