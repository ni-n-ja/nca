'use strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    env = process.env,
    recentPosted = null,
    app = express();
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

var server = app.listen('3000', 'localhost');
var sktio = require('./sktio')(server);
console.log("ok");