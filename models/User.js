var Waterline = require('waterline');
var dbConfig = require('../config/dbConfig.js');

var User = Waterline.Collection.extend({
    identity : 'user',
    connection : 'redis',
    
    attributes: {
        firstName: 'string',
        lastName: 'string'
    }
});

module.exports = User;