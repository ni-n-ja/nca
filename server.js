'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);
var io = require('./io')(server);
var bodyParser = require('body-parser');
var router = express.Router();
var config = require('./config');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    next();
});

router.route('/api').get(function (req, res) {
    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.end(JSON.stringify({
        "message": "hello!!!sss"
    }));
});

app.use('/', router);
app.get('/api/config', function (req, res) {
    res.send('var config = ' + JSON.stringify(config));
});

server.listen(3000);

// io.on('connection', function (socket) {
//     socket.on('error', function (err) {
//         console.log("Websocket 'error' event:", err);
//     });
//     socket.on('connect', function (data) {
//         console.log("Websocket 'connected' event with params:", data);
//     });
//     socket.on('disconnect', function () {
//         console.log("Websocket 'disconnect' event");
//     });
//     socket.on('hello', function (data) {
//         console.log("Client says:", data);
//         socket.emit('ping', data);
//     });
// });