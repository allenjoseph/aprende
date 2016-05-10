'use strict';

var config = require('./../utils/config');
var Sequelize = require('sequelize');

var config = {
	host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: config.db
};

var orm = new Sequelize('aprende', null, null, config);

module.exports = orm;