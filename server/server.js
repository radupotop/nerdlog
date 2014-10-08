// socket server demo
var server = require('http').createServer(httpHandler);
var io = require('socket.io')(server);

server.listen(8081);

/**
 * Main route
 */
function httpHandler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Server is up.');
    res.end();
}

/**
 * Handle connection upgrade
 */
io.on('connection', function(socket) {

    /**
     * Handle data from client
     * Timestamp the data when leaving server.
     */
    socket.on('msg', function(data) {

        data.timestamp = new Date().toJSON();

        console.log(data);

        socket.broadcast.emit('scrollback', data);

        /**
         * Client should queue messages and resend if
         * no ACK is received in a reasonable timeframe.
         */
        socket.emit('ack', data);

    });

    /**
     * User joined
     */
    socket.on('join', function(data) {
        socket.broadcast.emit('join', data);
    });

});
