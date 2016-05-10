'use strict';

var jsonwebtoken = require('jsonwebtoken');
var config = require('./config');

var handler = {
	response: response,
	jwt: jwt
};

function response(res){
	return {
		fail: fail
	};

	function fail(err){
		res.json({ok: false, error : err.message});
	}
}

function jwt(req, res, next) {

	if(config.publicUrls.indexOf(req.url) > -1){

		next();

	}else {

		var token = req.get('x-access-token');

		jsonwebtoken.verify(token, config.secret, function(err, decoded){

			if (err) {
				response(res).fail(err);
			}else{
				next();
			}
		});
	}
}

module.exports = handler;