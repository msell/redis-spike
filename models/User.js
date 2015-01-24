var Waterline = require('waterline');

var User = Waterline.Collection.extend({
    identity: 'user',
    connection: 'redis',

    attributes: {
        firstName: 'string',
        lastName: 'string'
    }
});

module.exports = User;