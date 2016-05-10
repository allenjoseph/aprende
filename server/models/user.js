'use strict';

var orm = require('./../persistence/orm');
var Sequelize = require('sequelize');

var files = {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		}
	},
	name: {
		type: Sequelize.STRING
	},
	active: {
		type: Sequelize.BOOLEAN
	},
	code: {
		type: Sequelize.BOOLEAN
	}
};

var options = {
	freezeTableName: true
};

var User = orm.define('users', files, options);

module.exports = User;