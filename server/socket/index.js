'use strict';

module.exports = function(server){

	var io = require('socket.io')(server);

	var chat = io.of('/chat');
	
	var clients = {};
	
	chat.on('connection', onChatConn);

	function onChatConn(socket){
		
		socket.on('identify me',  function(user) {
		    if( user && user.email && !clients[user.email]){
		    	var client = {
		    		user: user,
		    		socketId : socket.id
		    	};
		    	
		    	clients[user.email] = client;
		    }
		});
		
		socket.on('disconnect', function(){
			//..
		});

		socket.on('join', function(room){
			//..
		});

		socket.on('message', function(message){
			socket.broadcast.emit('message', message);
		});
	}
};
