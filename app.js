//including node_module packages in this file
var mysql = require('mysql');
var express = require('express');
const exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
//const  response  = require('express');
//const { request } = require('http');
var CreateError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var expressValidator = require('express-validator');

require('dotenv').config();

var app = express();
const port = process.env.PORT || 5000;

//connecting mysql database
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: "",
    database: 'stock-ease',
    port:3306
});



connection.connect((err)=>{
    if(err) throw err;
    console.log("connected")

});

//setting up ejs
app.set("view-engine","ejs");
//using some of Express packages
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());


app.use(express.static('views'));
app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('routes'));

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(flash());
app.use(expressValidator());


app.get('', (req, res)=> {
    res.render('home');
})

app.get('/home', (req, res)=> {
    res.render('home');
})

app.get('/login', (req, res)=> {
    res.render('login');
});
app.get('/register', (req, res)=> {
    res.render('register');
});

app.get('/mainadmin', (req, res)=> {
    res.render('mainadmin');
});

app.get('/sadmin', (req, res)=> {
    res.render('sadmin');
});

app.get('/padmin', (req, res)=> {
    res.render('padmin');
});

app.get('/madmin', (req, res)=> {
    res.render('madmin');
});

app.get('/homemanager', (req, res)=> {
    res.render('homemanager');
});

//handling post request
app.post('/authman', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('select * from manager where username = ? and password = ?', [username, password], function(error, results, fields) {
            if(results.length > 0) {
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
app.post('/authadm', (request,response)=> {
    var username = request.body.username1;
    var password = request.body.password1;
    if(username && password) {
        connection.query('select * from admin where username = ? and password = ?', [username, password], (error, results, fields) =>{
            if(results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('mainadmin');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    }   else {
            response.send('Please enter a Username and Password!');
            response.end();
    }
});
app.post('/cadmin', (request, response)=> {
    var name = request.body.Aname;
    var username = request.body.Ausername;
    var password = request.body.Apassword;
    var repassword = request.body.Arpassword;
    var email = request.body.Aemail;
    if(password == repassword) {
        connection.query('Select * from admin where username = ?', [username], (error, results, fields)=> {
            if(results.length > 0) {
                response.redirect('register')
            }
        })
        connection.query('Select * from admin where email_id = ?', [email], (error, results, fields)=> {
            if(results.length > 0) {
                response.send('Email already used by another admin!');
                response.redirect('register')
            }
        })
    } else {
        response.send('Passwords do not match')
        response.redirect('register')
    }
    
})















//catch 404 and forward to next handler
app.use(function(req,res,next) {
    next(CreateError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //render error page
    res.status(err.status || 500);
    res.render('error');
})
module.exports = app;




app.listen(port, ()=> console.log(`Listening on port ${port}`));