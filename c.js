'use strict'

var portAudio = require('naudiodon');

var ao = new portAudio.AudioOutput({
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat8Bit,
    sampleRate: 44100,
    deviceId: -1
});

var length = 1024;
var buffer = Buffer.allocUnsafe(length * 2);

for (var i = 0; i < length * 2; i += 2) {
    buffer[i] = (Math.sin((i / length) * 3.1415 * 2.0) * 12);
    buffer[i + 1] = (Math.sin((i / length) * 3.1415) * 12);
}

process.on('message', function (data) {

    for (var i = 0; i < length * 2; i += 2) {
        buffer[i] = data.r[i];
        buffer[i + 1] = data.l[i];
        // buffer[i] = (Math.sin((i / length) * 3.1415 * 2.0) * 12);
        // buffer[i + 1] = (Math.sin((i / length) * 3.1415) * 12);
    }

});

if (ao == null) {
    ao.quit();
}
ao.on('error', err => console.error);

process.on('play', () => {
    write();
    setTimeout(() => {
        process.emit('play');
    }, 20);
});

function write() {
    var ok = true;
    ok = ao.write(buffer);
    if (!ok) {
        ao.once('drain', write);
    }
}
process.emit('play');

ao.start();

process.once('SIGINT', ao.quit);