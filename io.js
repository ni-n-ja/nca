var io = function (server) {

    // var io = require("socket.io")(server, {
    //     path: '/ws'
    // });
    var socketio = require("socket.io")(server);
    var portAudio = require('naudiodon');
    portAudio.getDevices().forEach((e, i, arr) => {
        if (e.maxInputChannels == 2 || e.maxOutputChannels == 2) {
            console.log(e);
        }
    });

    var ai = new portAudio.AudioInput({
        channelCount: 2,
        sampleFormat: portAudio.SampleFormat16Bit,
        sampleRate: 44100,
        //deviceId: 20
        deviceId: 14
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
            ai.stop();
        });

        socket.on('hello', function (data) {
            console.log("Client says:", data);
            ai.on('data', data => {
                console.log(data);
                socket.emit('data', data);
                // console.log(data);
            });
            ai.on('error', err => console.error);
            ai.start();
        });
    });


}

module.exports = io;