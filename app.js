/*var express = require('express')
  , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
*/



var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	
	console.log("new connection");

	socket.on('acceleration', function(data){
        io.emit('accelx', data);
    });

});

//server.listen(3000);


http.listen(3000, function(){
  console.log('start server side game');
});

