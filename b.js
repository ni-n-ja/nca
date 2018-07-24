var portAudio = require('naudiodon');

console.log(portAudio.getDevices());

var ai = new portAudio.AudioInput({
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId: 20
});

// ai.on('data', data => console.log(data));
// ai.on('error', err => console.error);
// ai.start();