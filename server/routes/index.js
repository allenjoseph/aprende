'use strict';

var routes = {
	init: init
};

function init(app){
	return {
		login: require('./login')(app),
		user: require('./user')(app)
	};
}

module.exports = routes;