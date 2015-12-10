var express    = require('express');
var bodyParser = require('body-parser');
var http       = require('http');
var redis      = require('redis');
var config     = require('config');

var DATABASE_ERROR = {code: 2, message: 'Database Error'};
var DUPLICATE_USER_ERROR = {code: 1, message: 'Attempted to register duplicate user.'};
var UNKNOWN_ERROR = {code: 3, message: 'An error has occurred.'};

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/hello', function(req, res){
  res.send('<h1>Hello world</h1>');
});

var redisHost = config.get('Redis.host');
var redisPort = config.get('Redis.port');
var redisClient = redis.createClient(redisPort, redisHost);
app.post('/user/register', function(req, res){
    var username = req.body.username;
    var userKey = 'user:' + username;
    console.log('Register user: ' + username);
    redisClient.exists(userKey, function(err, userExists) {
        if (err) {
            console.error('Redis EXISTS error during user registration.', err);
            return res.status(400).json(DATABASE_ERROR)
        }
        if (userExists) {
            return res.status(400).json(DUPLICATE_USER_ERROR);
        }
        var user = {date_created: new Date()}
        redisClient.set(userKey, JSON.stringify(user), function(err, result) {
            if (err) {
                console.error('Redis SET error during user registration.', err);
                return res.status(400).json(DATABASE_ERROR)
            }
            if (result != 'OK') {
                console.error('Redis SET result error: ' + result);
                return res.status(400).json(UNKNOWN_ERROR);
            }
            res.status(200).json(user);
        });
    });
});

app.get('/user/:username', function(req, res) {
    var username = req.params.username;
    console.log('Get user: ' + username);
    var userKey = 'user:' + username;
    redisClient.get(userKey, function(err, userVal) {
        if (err) {
            console.error('Redis EXISTS error.', err);
            return res.status(400).json(DATABASE_ERROR);
        }
        if(!userVal) {
            return res.status(404).end();
        }
        var user = JSON.parse(userVal);
        res.status(200).json(user);
    });
});

app.post('/notes/:username', function(req, res) {
    
});

var port = config.get('Server.port');
var server = http.Server(app);
server.listen(port, function(){
  console.log('listening on *:' + port);
});
