(function () {
    var socket = io.connect();
    socket.on('error', function (err) {
        console.log("Websocket 'error' event:", err);
    });
    socket.on('disconnect', function () {
        console.log("Websocket 'disconnect' event");
    });

    socket.on('connect', function (data) {
        console.log("Websocket connected");
        socket.emit('hello', data);
    });
    socket.on('data', function (data) {
        console.log("Server says:", data);
    });
})();