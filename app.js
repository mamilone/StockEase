//including node_module packages in this file
var mysql = require('mysql');
var express = require('express');
const exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var flash = require('express-flash');
var expressValidator = require('express-validator');
const { manAuthCheck , admAuthCheck, getFaillogin, getLoginPage, getLogoutCheck}=require('./routes/login');
const { AdminCheck, getRegisterPage, getEmailFail, getUserFail, getPassFail } = require('./routes/register');
const { getAdminDetail, getManagerDetails, getSuggestion } = require('./routes/admind');
const { getManagerD, getshipment, getrestock, getProductDetails, getwarehouse} = require('./routes/mdetails');
const { delProduct, AddProduct } = require('./routes/AddDeleteProduct');
const { getSectionDetails, addSection, delSection } = require('./routes/AddDeleteSection');
const { ManagerAdd, checkManagerDel } = require('./routes/AddDeleteManager');
require('dotenv').config();
const database_name = 'stock-ease';

var app = express();
const port = process.env.PORT || 5000;

//connecting mysql database
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: "",
    database: 'stock-ease',
    port:4000
});



connection.connect((err)=>{
    if(err) throw err;
    console.log(`connected to ${database_name} Database`)
});
global.connection = connection;


//setting 
app.set('port', port);
app.set('views',__dirname + "/views");
//using some of Express packages
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('routes'));

app.set('views','./views')
app.set('view engine', 'ejs')

app.use(flash());
app.use(expressValidator());


app.get('', (req, res)=> {
    res.render('home');
})

app.get('/home', (req, res)=> {
    res.render('home');
})

app.all('/login', getLoginPage);
app.get('/mainadmin', getAdminDetail);
app.get('/sadmin', getSuggestion);
app.get('/madmin', getManagerDetails);
app.get('/secadmin',getSectionDetails);

app.get('/mwarehouse',getwarehouse);
app.get('/mproducts',getProductDetails);
app.get('/mrestock',getrestock);
app.get('/mshipment',getshipment);
app.get('/mainmanager',getManagerD);

app.get('/register', getRegisterPage);
app.get('/adminemailFail',getEmailFail);
app.get('/adminCheckFail',getUserFail);
app.get('/adminpassFail', getPassFail);
app.get('/gettoLogin',getLoginPage);

//handling post request
app.post('/authman', manAuthCheck);
app.post('/authadm', admAuthCheck);
app.get('/admAuthFail', getFaillogin);
app.get('/manAuthFail', getFaillogin);
app.post('/cadmin', AdminCheck); 

app.post('/authdelete',delProduct);
app.post('/logout',getLogoutCheck);

app.post('/addSection',addSection);
app.post('/secDelete',delSection);
app.post('/addProduct', AddProduct);
app.post('/addManager',ManagerAdd);
app.post('/delManager',checkManagerDel);















module.exports = app;




app.listen(port, ()=> console.log(`Listening on port ${port}`));