var express    = require('express');
var bodyParser = require('body-parser');
var http       = require('http');
var pg         = require('pg');
var config     = require('config');

var app = express();
app.use(bodyParser.json());
var server = http.Server(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

var conString = 'postgres://' + config.get('Postgres.username') + ':' + config.get('Postgres.password') + '@' +
    config.get('Postgres.host') + '/' + config.get('Postgres.database');
app.post('/user/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    pg.connect(conString, function(err, client, done) {
       if (err) {
           res.sendStatus(400);
           return console.error('Postgres connection error', err);
       }
       client.query('INSERT INTO users (name, password) VALUES ($1, $2)', [username, password], function(err, result) {
           if (err) {
              res.sendStatus(400);
              return console.error('Postgres query error', err);
           }
           done();
           res.sendStatus(200);
       });
    });
});

var port = config.get('Server.port');
server.listen(port, function(){
  console.log('listening on *:' + port);
});