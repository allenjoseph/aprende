'use strict';

var userCtrl = require('./../controllers/user');
var response = require('./../utils/handler').response;
var config = require('./../utils/config');
var jwt = require('jsonwebtoken');

module.exports = function(app){

	app
		.post('/validate-email', validEmail)
		.post('/register-email', registerEmail)
		.post('/validate-register', validateRegister)
		.post('/login', login);

	function validEmail(req, res){
		userCtrl
			.findByEmail(req.body.email)
			.then(ok, response(res).fail);

		function ok(value){
			res.json({ok: true, data : !!value});
		}
	}

	function registerEmail(req, res){
		userCtrl
			.register(req.body.email)
			.then(ok, response(res).fail);

		function ok(user){
			res.json({ok: true, data : user});
		}
	}

	function validateRegister(req, res){
		userCtrl
			.validateCode(req.body.email, req.body.code)
			.then(ok, response(res).fail);

		function ok(user){
			var token = jwt.sign(user, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});

			res.json({ok: true, data : token});
		}
	}

	function login(req, res){
		userCtrl
			.validate(req.body.email, req.body.password)
			.then(ok, response(res).fail);

		function ok(user){
			var token = jwt.sign(user, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});

			var data = {
				token: token,
				user: user
			};

			res.json({ok: true, data : data});
		}
	}
};
