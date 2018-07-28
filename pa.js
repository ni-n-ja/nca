// var io = require("socket.io")(server, {
//     path: '/ws'
// });

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
    deviceId: 20
    //deviceId: 14
});

ai.on('data', data => {
    console.log(data);
    ai.quit();
});
ai.on('error', err => console.error);
ai.start();