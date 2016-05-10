(function() {
	'use strict';

	angular
		.module('app')
		.controller('Chat', Chat);

	Chat.$inject = ['socket'];

	function Chat(socket){
		var vm  = this;

		vm.messages = socket.messages;

		vm.send = function(msg){

			socket.sendMessage(msg);

			vm.message = '';
		};
	}
})();