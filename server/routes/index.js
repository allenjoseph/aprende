'use strict';

var routes = {
	init: init
};

function init(app){
	return {
		user: require('./user')(app)
	};
}

module.exports = routes;