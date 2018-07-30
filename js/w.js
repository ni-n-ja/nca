var audioCtx = new AudioContext();
var buffer = null;
var source = context.createBufferSource();
var scriptNode = audioCtx.createScriptProcessor(4096, 2, 2);
var gainNode = audioCtx.createGain();

var buffer = new Uint8Array();
var right = new Uint8Array();
var left = new Uint8Array();

var request = new XMLHttpRequest();
request.open('GET', 'w.mp3', true);
request.responseType = 'arraybuffer';
request.send();

request.onload = function () {
    var res = request.response;
    context.decodeAudioData(res, function (buf) {
        source.buffer = buf;
    });


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
        scriptNode.onaudioprocess = (event) => {
            var inputBuffer = event.inputBuffer;
            var outputBuffer = event.outputBuffer;
            for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
                var outputData = outputBuffer.getChannelData(channel);
                for (var sample = 0; sample < inputBuffer.length; sample++) {
                    outputData[sample] = right[sample % inputBuffer.length];
                }
            }
        }
        gainNode.gain.value = 0.0005;
        scriptNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    });
    socket.on('data', function (data) {
        buffer = new Uint8Array(data);
        right = new Uint8Array(buffer.length / 2);
        left = new Uint8Array(buffer.length / 2);
        for (var i = 0; i < buffer.length; i += 2) {
            right[i] = buffer[i];
            left[i] = buffer[i + 1];
        }
    });

};

source.connect(context.destination);
source.start(0);