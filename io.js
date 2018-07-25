var io = function (server) {

    // var io = require("socket.io")(server, {
    //     path: '/ws'
    // });
    var socketio = require("socket.io")(server);
    var portAudio = require('naudiodon');
    console.log(portAudio.getDevices());
    var ai = new portAudio.AudioInput({
        channelCount: 2,
        sampleFormat: portAudio.SampleFormat16Bit,
        sampleRate: 44100,
        deviceId: 20
    });

    socketio.on('connection', function (socket) {
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
            ai.on('data', data => {
                socket.emit('data', data);
                // console.log(data);
            });
            ai.on('error', err => console.error);
            ai.start();
        });
    });


}

module.exports = io;