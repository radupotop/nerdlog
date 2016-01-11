// socket server demo
var server = require('http').createServer(httpHandler);
var io = require('socket.io')(server);
var model = require('./model');

server.listen(8081);
io.set('transports', ['websocket']);

/**
 * Main route only shows the server status.
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
     * List available boards.
     */
    socket.on('getAllBoards', function() {
        model.getAllBoards(function(err, resp) {
            socket.emit('boards', {boards: resp});
        });
    });
    
    socket.on('getAllPostsFromBoard', function(boardId) {
        model.getAllPostsFromBoard(boardId, function(err, resp) {
            socket.emit('posts', {posts: resp});
        });
    });

    /**
     * Add new post
     */
    socket.on('addPostToBoard', function(post){
        model.addPostToBoard(post.boardId, post.userId, post.contents, function(err, resp) {
            model.getPost(resp.insertId, function(err, resp) {
                socket.emit('newPost', {post: resp[0]});
            });
        });
    });

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
