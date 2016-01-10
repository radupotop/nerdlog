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
    }

    $scope.input = {
        user: "The Dude"
    };

    /**
     * Get all boards initially.
     */
    socket.emit('getAllBoards');
    socket.on('boards', function(resp) {
        $scope.boards = resp.boards;
        $scope.$apply();
    });
    
    /**
     * Get all posts from a certain board.
     */
    function getAllPostsFromBoard(boardId) {
        socket.emit('getAllPostsFromBoard', boardId);
        socket.on('posts', function(resp) {
            $scope.posts = resp.posts;
            $scope.$apply();
        });
    }
    
    $scope.getAllPostsFromBoard = getAllPostsFromBoard;

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

/**
 * Markdown filter.
 * To be used with ng-bind-html=""
 */
client.filter('markdown', function($sce) {
    return function(value) {
        return $sce.trustAsHtml(markdown.toHTML(value));
    };
});
