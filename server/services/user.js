'use strict';

var Q = require('q');
var User = require('./../models/user');

var service = {
	findByEmail: findByEmail,
	findOrCreate: findOrCreate,
	update: update
};

function findByEmail(email){
	var deferred = Q.defer();

	User.findOne({
		where: {email: email}
	}).then(function(user){
		deferred.resolve(user && user.get({plain: true}));
	}).catch(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
}

function findOrCreate(email, defaults){

	var deferred = Q.defer();

	User.findOrCreate({
		where: {email: email},
		defaults: defaults
	}).spread(function(user){
		deferred.resolve(user.get({plain: true}));
	}).catch(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
}

function update(email, fields){
	var deferred = Q.defer();

	User.findOne({ 
		where: {email: email} 
	}).then(function(user){
		user.update(fields).then(function(user){
			deferred.resolve(user.get({plain: true}));
		});
	}).catch(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
}

module.exports = service;