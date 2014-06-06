// socket client demo
var socket = io.connect('ws://localhost:3001');

/**
 * Listen on event from server
 */
socket.on('news', function(data) {
  console.log(data);
});

/**
 * Emit to client
 */
socket.emit('client', {client: 'UA: ' + window.navigator.userAgent});
