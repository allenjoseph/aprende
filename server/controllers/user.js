'use strict';

var userService = require('./../services/user');
var helpers = require('./../utils/helpers');
var Q = require('q');

var ctrl = {
	findByEmail: findByEmail,
	register: register,
	validate: validate,
	update: update
};

function findByEmail(email){
	return userService.findByEmail(email);
}

function register(email){
	var defaults = {
		code: helpers.random(),
		active: false
	};

	return userService.findOrCreate(email, defaults);
}

function validate(email, code){
	var deferred = Q.defer();

	userService
		.findByEmail(email)
		.then(function(user){
			if(user.code === code){
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

module.exports = ctrl;