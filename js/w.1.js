var audioCtx = new AudioContext();
var buffer = null;
var source = audioCtx.createBufferSource();
var length = 4096;
var scriptNode = audioCtx.createScriptProcessor(length, 2, 2);
var gainNode = audioCtx.createGain();

var rightInput;
var leftInput;

var buffer = new Uint8Array(length);
var right = new Uint8Array(length);
var left = new Uint8Array(length);

var request = new XMLHttpRequest();
request.open('GET', 'w.mp3', true);
request.responseType = 'arraybuffer';

window.onload = () => {

    var socket = io.connect();
    request.onload = function () {
        var res = request.response;

        audioCtx.decodeAudioData(res, function (buf) {
            source.buffer = buf;
        });

        scriptNode.onaudioprocess = (event) => {
            rightInput = event.inputBuffer.getChannelData(0);
            leftInput = event.inputBuffer.getChannelData(1);
            for (var i = 0; i < length; i++) {
                right[i] = rightInput[i] * 64;
            }
            for (var i = 0; i < length; i++) {
                left[i] = leftInput[i] * 64;
            }
            socket.emit('data', {
                r: right,
                l: left
            });
        }
        gainNode.gain.value = 0.3;
        source.connect(scriptNode);
        scriptNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        document.body.onclick = () => {
            source.start(0);
            socket.emit('hello');
        };

    };
    request.send();
};