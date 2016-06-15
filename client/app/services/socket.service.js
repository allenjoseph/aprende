(function(){
	'use strict';

	angular
		.module('app')
		.service('socket', socket);

	socket.$inject = ['$rootScope', '$timeout'];

	function socket($rootScope, $timeout){
		/* jshint validthis: true */
		var service = this;

		var socket = window.io('/chat');

		socket.on('message', function(mesage){
			$timeout(function(){
				service.messages.unshift(mesage);
			});
		});

		service.messages = [];
		
		service.identifyMe = function () {
			socket.emit('identify me', $rootScope.user);		
		};

		service.sendMessage = function (mesage) {
			//var mesage = { user: $rootScope.user, msg: msg };
			service.messages.unshift(mesage);
			socket.emit('message', mesage);
		};
		
		service.sendInbox = function (message, receiver) {
		};
	}
})();