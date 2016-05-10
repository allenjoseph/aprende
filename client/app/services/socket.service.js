(function(){
	'use strict';

	angular
		.module('app')
		.service('socket', socket);

	socket.$inject = ['$rootScope', '$timeout'];

	function socket($rootScope, $timeout){
		/* jshint validthis: true */
		var service = this;

		var socket = window.io();

		socket.emit('join', 'chat');

		socket.on('message', function(mesage){
			$timeout(function(){
				service.messages.unshift(mesage);
			});
		});

		service.messages = [];

		service.sendMessage = function (mesage) {
			//var mesage = { user: $rootScope.user, msg: msg };
			service.messages.unshift(mesage);
			socket.emit('message', mesage);
		};
	}
})();