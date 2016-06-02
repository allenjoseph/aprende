'use strict';

var path = require('path');

var config = {
	port: process.env.PORT || 3232,
	host: process.env.IP || 'localhost',
	root: path.join(__dirname, '..', '..'),
	client: path.join(__dirname, '..', '..', 'dist'),
	db: path.join(__dirname, '..', '..', 'aprende.db'),
	secret: 'secret for dev',
	publicUrls:[
		'/validate-email',
		'/register-email',
		'/validate-register',
		'/login'
	]
};

module.exports = config;