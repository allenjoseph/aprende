'use strict';

var userService = require('./../services/user');
var helpers = require('./../utils/helpers');
var bcrypt = require('bcrypt');
var Q = require('q');

var ctrl = {
	findByEmail: findByEmail,
	register: register,
	validateCode: validateCode,
	update: update,
	validate: validate
};

function findByEmail(email){
	return userService.findByEmail(email);
}

function register(email){
	var code = helpers.random();
	var defaults = {
		code: code,
		password: bcrypt.hashSync(code, 10),
		active: false
	};

	return userService.findOrCreate(email, defaults);
}

function validateCode(email, code){
	var deferred = Q.defer();

	userService
		.findByEmail(email)
		.then(function(user){
			if(user.code === code){
				//TODO: Update field active 
				deferred.resolve(user);
			}else{
				deferred.reject({ message: 'Invalid code validation'});
			}
		});

	return deferred.promise;
}

function update(email, fields){
	return userService.update(email, fields);
}

function validate(email, password){
	var deferred = Q.defer();

	userService
		.findByEmail(email)
		.then(function(user){
			deferred.resolve(user);
		});

	return deferred.promise;
}

module.exports = ctrl;