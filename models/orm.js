var Waterline = require('waterline'),
    User = require('./User.js'),
    Pet = require('./Pet.js'),
    config = require('../config/dbConfig.js'),
    app = require('../server.js').app;


module.exports = {
    initialize: function () {
        var orm = new Waterline();
        orm.loadCollection(User);
        orm.loadCollection(Pet);
        console.log(JSON.stringify(orm));
        orm.initialize(config, function (err, models) {
            if (err) throw err;
            
            console.log('models : ' +models);
            app.models = models.collections;
            app.connections = models.connections;
        })
    }
}