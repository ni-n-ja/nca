(function() {
    var socket = io.connect({
        path: '/ws'
    });
    socket.on('error', function(err) {
        console.log("Websocket 'error' event:", err);
    });
    socket.on('connect', function(data) {
        console.log("Websocket 'connected' event with params:", data);
        socket.emit('ping', {
            id: "sddsda"
        });
    });
    socket.on('disconnect', function() {
        console.log("Websocket 'disconnect' event");
    });
    socket.on('hello', function(data) {
        console.log("Server says:", data);
    });
})();
