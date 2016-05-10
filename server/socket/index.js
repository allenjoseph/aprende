'use strict';

module.exports = function(server){

	var io = require('socket.io')(server);

	io.on('connection', onConnection);

	function onConnection(socket){
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
