var client = angular.module('client', []);

client.controller('msg', function($scope, config) {

    var socket = io.connect('ws://' + config.host + ':' + config.port, {transports: ['websocket']});

    $scope.scrollback = [];

    /**
     * Append message to scrollback
     */
    function appendToScrollback(scrollback) {
        console.log(scrollback);
        $scope.scrollback.push(angular.copy(scrollback));
        $scope.$apply();
    };

    $scope.input = {
        user: "The Dude"
    };

    var socket = io.connect('ws://' + config.host + ':' + config.port);

    socket.emit('join', {user: $scope.input.user, msg: 'joined'});

    /**
     * Send a message.
     */
    $scope.sengMsg = function(input) {

        if(input.msg) {

            socket.emit('msg', input);

            // clear msg
            $scope.input.msg = '';

        }

    };

    /**
     * Handle events from server.
     */
    ['scrollback', 'ack', 'join'].forEach(function(event){
        return socket.on(event, appendToScrollback);
    });

});
