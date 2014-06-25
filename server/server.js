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
     * Timestamp the data when leaving server.
     */
    socket.on('msg', function(data) {
        console.log(data);
        data.timestamp = new Date().toISOString();
        socket.broadcast.emit('scrollback', data);
        socket.emit('ack', data);
    });

});
