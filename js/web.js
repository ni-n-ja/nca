'use strict'

var ctx;
var backCtx;
var canvas;

var audioCtx = new AudioContext();
var source = audioCtx.createBufferSource();
var scriptNode = audioCtx.createScriptProcessor(4096, 2, 2);
var gainNode = audioCtx.createGain();

var buffer = new Uint8Array();
var right = new Uint8Array();
var left = new Uint8Array();

var length = 1;

window.onload = () => {
    canvas = document.getElementById("canvas");
    canvas.width = 500;
    // canvas.height = canvas.width * canvas.offsetHeight / canvas.offsetWidth;
    canvas.height = 500;
    ctx = canvas.getContext("2d");
    let backCanvas = document.createElement('canvas');
    backCanvas.setAttribute('width', canvas.width + 'px');
    backCanvas.setAttribute('height', canvas.height + 'px');
    backCanvas.setAttribute('background-color', 'rgba(0,0,0,0)');
    backCtx = backCanvas.getContext("2d");

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
        // ctx.clearRect(0, 0, 500, 500);
        //console.log(buffer);
        buffer = new Uint8Array(data);
        right = new Uint8Array(buffer.length / 2);
        left = new Uint8Array(buffer.length / 2);
        for (var i = 0; i < buffer.length; i += 2) {
            right[i] = buffer[i];
            left[i] = buffer[i + 1];

            // ctx.strokeStyle = 'rgba(0,204,255,255)';
            // ctx.beginPath();
            // ctx.moveTo(i * length / 500 - 1, 0);
            // ctx.lineTo(i * length / 500 - 1, buffer[i] * 0.1);
            // ctx.stroke();

            // ctx.strokeStyle = 'rgba(0,0,255,255)';
            // ctx.beginPath();
            // ctx.moveTo(i * length / 500 - 1, 200);
            // ctx.lineTo(i * length / 500 - 1, 200 + buffer[i + 1] * 0.5);
            // ctx.stroke();
        }

    });
}