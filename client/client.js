var client = angular.module('client', []);

client.controller('msg', function($scope, config) {

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

    var socket = io.connect('ws://' + config.host + ':' + config.port);

    socket.emit('join', {user: $scope.input.user, msg: 'joined'});

    /**
     * Send a message.
     * Append to own scrollback without roundtrip to server.
     */
    $scope.sengMsg = function(input) {

        if(input.msg) {

            socket.emit('msg', input);

            //~ $scope.appendToScrollback(input);

            // clear msg
            $scope.input.msg = '';

        }

    };

    /**
     * Handle events from server.
     */
    ['scrollback', 'ack', 'join'].forEach(function(event){
        return socket.on(event, function(msg) {
            $scope.appendToScrollback(msg);
            $scope.$apply();
        });
    });

});
