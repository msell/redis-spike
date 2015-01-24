(function () {
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var Waterline = require('waterline');    
    var users = require('./controllers/userController.js');
    var User = require('./models/User.js');
    var dbConfig = require('./config/dbConfig.js');
    var loadModels = require('./models/loadModels.js');
    
    var orm = new Waterline();

    var app = exports.app = express();
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.get('/users', users.getUsers);

    app.get('/ping', function (req, res) {
        res.send(200, 'Pong');
    });

    loadModels(orm);

    orm.initialize(dbConfig, function (err, models) {
        if (err) throw err;
        app.models = models.collections;
        app.connections = models.connections;

        app.listen(process.env.port || 3001);
    });
})();