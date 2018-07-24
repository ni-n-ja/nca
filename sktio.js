var sktio = function(server) {

    var io = require("socket.io")(server, {
        path: '/ws'
    });
    io.on('connection', function(socket) {
        socket.emit('hello', {
            greeting: 'Hi socket ' + socket.id + ' this is Server speaking! Let\'s play ping-pong. You pass!'
        });
        socket.on('ping', function(data) {
            console.log("received ping from client: ", data);
            socket.emit('pong', {
                id: data.id
            });
        });
    });

}

module.exports = sktio;
