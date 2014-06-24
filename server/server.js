// socket server demo
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

/**
 * Main route
 */
app.get('/', function(req, res) {
    res.write('');
    res.end();
});

/**
 * Handle connection upgrade
 */
io.on('connection', function(socket) {

    /**
     * Handle data from client
     */
    socket.on('msg', function(data) {
        console.log(data);
        socket.broadcast.emit('scrollback', data);
    });

});
