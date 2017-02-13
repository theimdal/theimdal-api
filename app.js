// 3rd party
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Logging
let logger = require('./log.js');

// Models
let Site = require('./models/site');

// Services
//var siteService =  require('./services/siteService');

// Configuration
let appConfig = require('./app.configurasjon')(app, bodyParser, mongoose);

// Routes
let site = require('./routes/sites');

app.get('/ping', (req, res) => {
    res.json({message: "pong"});
});

app.get('/', (req, res) => {
    res.json({message: "Welcome to the theimdal API"});
});

app.route("/site")
    .get(site.getSites)
    .post(site.postSite);

app.route("/site/:id")
    .get(site.getSite)
    .delete(site.deleteSite)
    .put(site.updateSite);

// Server
let server = app.listen(app.get('port'), () => {

    var host = server.address().address;
    var port = server.address().port;

    logger.info("Application listening at http://%s:%s", host, port)

})

module.exports = app; // for testing