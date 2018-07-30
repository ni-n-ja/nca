'use strict'

var child_process = require('child_process');
var portAudio = require('naudiodon');

var child = child_process.fork('c.js');
var ao = new portAudio.AudioOutput({
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat8Bit,
    sampleRate: 44100,
    deviceId: -1
});

var length = 400;
var buffer = Buffer.allocUnsafe(length * 2);

process.on('message', function (msg) {
    console.log(buffer[0]);
    let data = msg.data;
    for (var i = 0; i < length * 2; i += 2) {
        // buffer[i] = data.r[i];
        // buffer[i + 1] = data.l[i];
        buffer[i] = (Math.sin((i / length) * 3.1415 * 2.0) * 127);
        buffer[i + 1] = (Math.sin((i / length) * 3.1415) * 127);
    }
});

if (ao != null) {
    ao.quit();
}
ao.on('error', err => console.error);
ao.start();

function loop(writer, data) {
    write();

    function write() {
        var ok = true;
        do {
            ok = writer.write(data);
            //console.log("w", data);
        } while (ok);
        if (!ok) {
            writer.once('drain', write);
            //console.log("d", data);
        }
    }
}

ao.on('error', console.error);

loop(ao, buffer);

process.once('SIGINT', ao.quit);