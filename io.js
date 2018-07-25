var io = function (server) {

    // var io = require("socket.io")(server, {
    //     path: '/ws'
    // });
    var io = require("socket.io")(server);
    io.on('connection', function (socket) {
        socket.on('error', function (err) {
            console.log("Websocket 'error' event:", err);
        });
        socket.on('connect', function (data) {
            console.log("Websocket 'connected' event with params:", data);
        });
        socket.on('disconnect', function () {
            console.log("Websocket 'disconnect' event");
        });
        socket.on('hello', function (data) {
            console.log("Client says:", data);
            socket.emit('ping', data);
        });
    });
}

module.exports = io;