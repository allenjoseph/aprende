'use strict';

var orm = require('./../persistence/orm');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var fields = {
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
	},
	password: Sequelize.STRING
};

var options = {
	freezeTableName: true,
	classMethods: {
		comparePassword : function(candidate, cb) {
			bcrypt.compare(candidate, this.getDataValue('password'), function(err, isMatch) {
				if(err) {
					return cb(err);
				}
				cb(null, isMatch);
			});
		}
	}
};

var User = orm.define('users', fields, options);

module.exports = User;