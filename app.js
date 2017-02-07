// 3rd party
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Logging
var logger = require('./log.js');

// Models
var Site = require('./models/site');

// Services
//var installationService =  require('./services/installationService');

// Configuration
var appConfig = require('./app.configurasjon')(app, bodyParser, mongoose);

// Routes
//var installationRoutes = require('./routes/installations')(app, Installation, Deviation, Channel);

app.get('/ping', function(req, res) {
    res.send('pong!');
});

app.get('/', function(req, res) {
    res.send('nothing here!');
});

// Server
var server = app.listen(app.get('port'), function () {

    var host = server.address().address;
    var port = server.address().port;

    logger.info("Application listening at http://%s:%s", host, port)

})