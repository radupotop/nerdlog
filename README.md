Nerdlog
-------

Real-time discussion board. This is a blend between a chat and
a discussion board.

Nerdlog uses a client-server architecture model.
The client is written in AngularJS, the server is written in NodeJS.
They communicate with websockets.
New posts are pushed to users in real-time.


Individual threads are not supported, only boards with posts in them.
Threads will probably never be supported. 
Posts will have the option to be tagged.

Only the server model has unit tests for now.
The session module is WIP.


To run
------

node server/server.js

client/index.html has to be served from a webserver like apache or nginx to work.

Tests can be run with mocha


TODO
----

* subscribe to boards as socket.io channels
