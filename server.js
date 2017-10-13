var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337;

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/magazine');


var articals = require('./routes/articals');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.get('/', function (req, res) {
    res.sendFile("/index.html");
});

app.use('/articals', articals);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});