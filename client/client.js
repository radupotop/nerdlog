var client = angular.module('client', ['ngRoute']);
var socket;

/* Bootstrap app */
client.run(function(config) {
    socket = io.connect('ws://' + config.host + ':' + config.port, {transports: ['websocket']});
});

client.config(function($routeProvider) {
    
    $routeProvider
    .when('/', {
        controller: 'index',
        templateUrl: 'views/index.html'
    })
    .when('/board/:boardId', {
        controller: 'board',
        templateUrl: 'views/board.html'
    });
    
});

/**
 * Board index.
 */
client.controller('index', function($scope) {
    
    /**
     * Get all boards initially.
     */
    socket.emit('getAllBoards');
    socket.on('boards', function(resp) {
        $scope.boards = resp.boards;
        $scope.$apply();
    });
    
});

client.controller('board', function($scope, $routeParams, config) {

    //~$scope.scrollback = [];

    /**
     * Append message to scrollback
     */
    //~function appendToScrollback(scrollback) {
        //~console.log(scrollback);
        //~$scope.scrollback.push(angular.copy(scrollback));
        //~$scope.$apply();
    //~}

    //~$scope.input = {
        //~user: "The Dude"
    //~};

    /**
     * Get all boards initially.
     */
    //~socket.emit('getAllBoards');
    //~socket.on('boards', function(resp) {
        //~$scope.boards = resp.boards;
        //~$scope.$apply();
    //~});
    
    var boardId = +$routeParams.boardId;
    
    socket.emit('getAllBoards');
    socket.on('boards', function(resp) {
        $scope.boards = resp.boards;
        $scope.activeBoard = $scope.boards.filter(function(b){
            return b.board_id ===  boardId;
        })[0];
        $scope.$apply();
    });
    
    /**
     * Get all posts from a certain board.
     */
    socket.emit('getAllPostsFromBoard', boardId);
    socket.on('posts', function(resp) {
        $scope.posts = resp.posts;
        $scope.$apply();
    });

    //~socket.emit('join', {user: $scope.input.user, msg: 'joined'});

    /**
     * Send a message.
     */
    //~$scope.sengMsg = function(input) {

        //~if(input.msg) {

            //~socket.emit('msg', input);

            //~// clear msg
            //~$scope.input.msg = '';

        //~}

    //~};

    /* Add a new post */
    $scope.addPostToBoard = function(postContents){
        socket.emit('addPostToBoard', {
            contents: postContents,
            boardId: boardId,
            userId: 1
        });
        $scope.postContents = '';
        $scope.$apply();
    };
    
    socket.on('newPost', function(resp) {
        $scope.posts.push(resp.post);
        $scope.$apply();
    });

    /**
     * Handle events from server.
     */
    // ['scrollback', 'ack', 'join'].forEach(function(event){
    //     return socket.on(event, appendToScrollback);
    // });

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
