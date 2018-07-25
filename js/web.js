'use strict'

var ctx;
var backCtx;
var canvas;

var th;
var thPlus;
var height;
var x;
var scale;
var tension = 0;
var imageHeight;

window.onload = () => {
    canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = canvas.width * canvas.offsetHeight / canvas.offsetWidth;
    ctx = canvas.getContext("2d");
    let backCanvas = document.createElement('canvas');
    backCanvas.setAttribute('width', canvas.width + 'px');
    backCanvas.setAttribute('height', canvas.height + 'px');
    backCanvas.setAttribute('background-color', 'rgba(0,0,0,0)');
    backCtx = backCanvas.getContext("2d");
}