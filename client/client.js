// socket client demo
//~ var socket = io.connect('ws://localhost:3001');

/**
 * Listen on event from server
 */
//~ socket.on('news', function(data) {
    //~ console.log(data);
//~ });

/**
 * Emit to client
 */
//~ socket.emit('client', {client: 'UA: ' + window.navigator.userAgent});


var client = angular.module('client', []);

client.controller('msg', function($scope) {

    $scope.scrollback = [];

    /**
     * Append message to scrollback
     */
    $scope.appendToScrollback = function(scrollback) {
        console.log(scrollback);
        $scope.scrollback.push(angular.copy(scrollback));
    };

    $scope.input = {
        user: "The Dude"
    };

    var socket = io.connect('ws://localhost:3001');

    /**
     * Send a message
     */
    $scope.sengMsg = function(input) {

        if(input.msg) {

            socket.emit('msg', input);

            input.timestamp = new Date().toISOString();
            $scope.appendToScrollback(input);

            // clear msg
            $scope.input.msg = '';

        }

    };

    /**
     * Handle scrollback event from server
     */
    socket.on('scrollback', function(scrollback) {
        $scope.appendToScrollback(scrollback);
        $scope.$apply();
    });

});
