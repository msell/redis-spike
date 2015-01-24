(function () {
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var Waterline = require('waterline');
    var redis = require('redis');
    var users = require('./controllers/userController.js');
    var User = require('./models/User.js');
    var dbConfig = require('./config/dbConfig.js');
    //var orm = require('./models/orm.js');
    var orm = new Waterline();

    var app = exports.app = express();
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());


    var client = redis.createClient(6379, 'directory.redis.cache.windows.net');
    client.auth(process.env.REDIS_ACCESS_KEY);

    app.get('/users', users.getUsers);

    app.get('/get/:key', function (req, res) {
        var key = req.params.key;
        client.get(key, function (error, reply) {
            if (error) {
                res.send(500, error);
            } else {
                res.send(200, reply);
            }
        });
    });

    app.get('/set', function (req, res) {
        var key = req.param('key');
        var value = req.param('value');
        client.set(key, value, function (error, reply) {
            if (error) {
                res.send(500, error);
            } else {
                res.send(200, reply);
            }
        });
    });

    app.get('/ping', function (req, res) {
        res.send(200, 'Pong');
    });

    orm.loadCollection(User);


    orm.initialize(dbConfig, function (err, models) {
        if (err) throw err;
        app.models = models.collections;
        app.connections = models.connections;

        app.listen(process.env.port || 3001);
    });
})();