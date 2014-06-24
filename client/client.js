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

    /**
     * Append message to scrollback
     */
    $scope.appendToScrollback = function(scrollback) {
        angular.element('#scrollback').append(
            angular.element(['<p>', scrollback.user, ': ', scrollback.msg, '</p>\n'].join(''))
        );
        //~ $scope.scrollback += [scrollback.user, ': ', scrollback.msg, '\n'].join('');$scope.scrollback
        //~ $scope.scrollback.push(scrollback);
        //~ console.log($scope.scrollback);
        //~ $scope.$apply();
    }

    $scope.input = {
        user: "The Dude"
    }

    $scope.scrollback = [];

    var socket = io.connect('ws://localhost:3001');

    /**
     * Send a message
     */
    $scope.sengMsg = function(input) {

        if(input.msg) {

            socket.emit('msg', input);
            $scope.appendToScrollback(input);

            // clear msg
            $scope.input.msg = '';

        }

    };

    socket.on('scrollback', $scope.appendToScrollback);

});
