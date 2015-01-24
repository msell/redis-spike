var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'pet',
    connection: 'redis',

    attributes: {
        name: 'string',
        breed: 'string'
    }
});