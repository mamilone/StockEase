"use strict";

//including node_module packages in this file
var mysql = require('mysql');

var express = require('express');

var exphbs = require('express-handlebars');

var session = require('express-session');

var bodyParser = require('body-parser');

var path = require('path');

var response = require('express');

var _require = require('http'),
    request = _require.request;

require('dotenv').config(); //connecting mysql database


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "MohammedAimon@41",
  database: 'stock_ease'
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
}); //initialize express and port

var app = express();
var port = process.env.PORT || 5000; //setting up ejs

app.set("view-engine", "ejs"); //using some of Express packages

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express["static"]('views'));
app.use(express["static"]('styles'));
app.use(express["static"]('assets'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('', function (req, res) {
  res.render('home');
});
app.get('/home', function (req, res) {
  res.render('home');
});
app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/register', function (req, res) {
  res.render('register');
});
app.get('/homeadmin', function (req, res) {
  res.render('homeadmin');
});
app.get('/homemanager', function (req, res) {
  res.render('homemanager');
}); //handling post request

app.post('/auth', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;

  if (username && password) {
    connection.query('select * from manager where username = ? and password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('homemanager');
      } else {
        response.send('Incorrect Username and/or Password!');
      }

      response.end();
    });
  } else {
    response.send('Please enter a Username and Password!');
    response.end();
  }
});
app.post('/auth1', function (req, res) {
  var username = req.body.username1;
  var password = req.body.password1;

  if (username && password) {
    connection.query('select * from admin where username = ? and password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('homeadmin');
      } else {
        res.send('Incorrect Username and/or Password!');
      }

      res.end();
    });
  } else {
    res.send('Please enter a Username and Password!');
    res.end();
  }
});
app.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});
//# sourceMappingURL=index.dev.js.map
