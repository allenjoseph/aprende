'use strict';

var config = require('./utils/config');
var bodyParser = require('body-parser');
var express = require('express');
var db = require('./persistence/db');
var routes = require('./routes');
var jwt = require('./utils/handler').jwt;
var app = express();
var server = require('http').Server(app);
var socket = require('./socket')(server);

/* Sync Database */
db.sync();

/* Config server*/
app.use(bodyParser.json());
app.use(express.static(config.client));
app.use(jwt);

/* Adding routes */
routes.init(app);

/* Start server */
server.listen(config.port, config.host, onListening);

/* Methods */
function onListening(){
	console.log('listening on', config.host, 'port', config.port);
}