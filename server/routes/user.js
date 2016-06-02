'use strict';

var userCtrl = require('./../controllers/user');
var response = require('./../utils/handler').response;

module.exports = function(app){

	app
		.route('/users')
		.put(updateUser);

	function updateUser(req, res){
		var fields = {
			name: req.body.name
		};

		userCtrl
			.update(req.body.email, fields)
			.then(ok, response(res).fail);

		function ok(user){
			res.json({ok: true, data : user});
		}
	}
};
