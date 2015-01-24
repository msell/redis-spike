var Waterline = require('waterline');
var dbConfig = require('../config/dbConfig.js');

var Pet = Waterline.Collection.extend({

  identity: 'pet',
  //connection : redis.connection,

  attributes: {
    name: 'string',
    breed: 'string'
  }
});