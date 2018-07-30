var portAudio = require('naudiodon');
var ao = new portAudio.AudioOutput({
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat8Bit,
    sampleRate: 44100,
    deviceId: -1
});

var length = 400;
var buffer = Buffer.allocUnsafe(length * 2);

var io = function (server) {

    // var io = require("socket.io")(server, {
    //     path: '/ws'
    // });
    var socketio = require("socket.io")(server);

    socketio.on('connection', function (socket) {
        socket.on('error', function (err) {
            console.log("Websocket 'error' event:", err);
        });

        socket.on('connect', function (data) {
            console.log("Websocket 'connected' event with params:", data);
            ao.start();
        });

        socket.on('disconnect', function () {
            console.log("Websocket 'disconnect' event");
            if (ao != null) {
                ao.quit();
            }

        });

        socket.on('hello', function (data) {
            ao.on('error', err => console.error);
        });

        socket.on('data', function (data) {
            for (var i = 0; i < length * 2; i += 2) {
                buffer[i] = data.r[i];
                buffer[i + 1] = data.l[i];
                console.log(buffer);
                // buffer[i] = (Math.sin((i / length) * 3.1415 * 2.0) * 127);
                // buffer[i + 1] = (Math.sin((i / length) * 3.1415) * 127);
                write();

                function write() {
                    var ok = true;
                    do {
                        // writer.end(buffer, console.log("Done!"));
                        ok = ao.write(buffer);
                    } while (ok);
                    if (!ok) {
                        //ao.once('drain', write);
                    }
                }
            }
        });
    });

    process.once('SIGINT', ao.quit);
}

// write();

// function write() {
//     var ok = true;
//     do {
//         // writer.end(buffer, console.log("Done!"));
//         ok = ao.write(buffer);
//         console.log("w", buffer[0]);
//     } while (ok);
//     if (!ok) {
//         ao.once('drain', write);
//         console.log("d", buffer[0]);
//     }
// }

module.exports = io;