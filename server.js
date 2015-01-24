(function () {
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var redis = require('redis');

    var app = express();
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    
    var client = redis.createClient(6379, 'directory.redis.cache.windows.net');
    client.auth(process.env.REDIS_ACCESS_KEY);

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

    app.get('/set', function(req,res){
        var key = req.param('key');
        var value = req.param('value');
        client.set(key, value, function(error, reply){
            if(error){
                res.send(500, error);
            }
            else{
                res.send(200, reply);
            }
        });
    });
    
    app.get('/ping', function(req, res){
        res.send(200, 'Pong');
    });

    var server = app.listen(process.env.port || 3001, function(){
        console.log('Listening on port %d', server.address().port);
    });
    
})();