//including node_module packages in this file
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
const { manAuthCheck , admAuthCheck, getFaillogin, getLoginPage, getLogoutCheck}=require('./routes/login');
const { AdminCheck, getRegisterPage, getEmailFail, getUserFail, getPassFail, ManRegCheck, getmanregsuccess, alreadywait } = require('./routes/register');
const { getAdminDetail, getManagerDetails, getLogs, delLogs, getvmdetail } = require('./routes/admind');
const { getManagerD, getshipment, getrestock, getProductDetails} = require('./routes/mdetails');
const { delProduct, AddProduct, errordelproduct } = require('./routes/AddDeleteProduct');
const { getSectionDetails, addSection, delSection } = require('./routes/AddDeleteSection');
const { ManagerAdd, checkManagerDel } = require('./routes/AddDeleteManager');
const { ViewStocks, CheckShipStocks, DelStocks, calculateLocation, delStockSuccess, countStockFail, delmatchFail, delEmpty, delUpdateCat } = require('./routes/AddDeleteViewStocks');
const { calAvailAdd, CheckAddStocks, checkEmptyCat, sucAdd, notypeFail, addmatchFail } = require('./routes/StockCal');
const { verifym, remvman } = require('./routes/verifyman');
require('dotenv').config();
const database_name = 'stock-ease';

var app = express();
const port = 5000;

//connecting mysql database
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: "",
    database: database_name,
    port: 4000
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

//app.use(flash());
//app.use(expressValidator());


//setting up all the backend routing
app.get('', (req, res)=> {
    res.render('home');
})

app.get('/home', (req, res)=> {
    res.render('home');
})

app.all('/login', getLoginPage);
app.get('/mainadmin', getAdminDetail);
app.get('/madmin', getManagerDetails);
app.get('/secadmin',getSectionDetails);
app.get('/verifymadmin',getvmdetail);

app.post('/verifyman',verifym);
app.post('/remvman',remvman);

app.get('/logsadmin',getLogs);
app.post('/logdel', delLogs);

app.get('/mwarehouse',ViewStocks);
app.get('/mproducts',getProductDetails);
app.get('/mrestock',getrestock);
app.get('/mshipment',getshipment);
app.get('/mainmanager',getManagerD);

app.get('/register', getRegisterPage);
app.get('/adminemailFail',getEmailFail);
app.get('/adminCheckFail',getUserFail);
app.get('/adminpassFail', getPassFail);
app.get('/gettoLogin',getLoginPage);
app.get('/gettowait',getmanregsuccess);
app.get('/alreadywait',alreadywait);

//handling post request
app.post('/authman', manAuthCheck);
app.post('/authadm', admAuthCheck);
app.get('/admAuthFail', getFaillogin);
app.get('/manAuthFail', getFaillogin);
app.post('/cadmin', AdminCheck); 

app.post('/cmanager',ManRegCheck);
app.get('/manCheckFail',getUserFail);
app.get('/manemailFail',getEmailFail);
app.get('/manpassFail',getPassFail);

app.post('/authdelete',delProduct);
app.post('/logout',getLogoutCheck);

app.post('/addSection',addSection);
app.post('/secDelete',delSection);
app.post('/addProduct', AddProduct);
app.get('/errordelproduct',errordelproduct);
app.post('/addManager',ManagerAdd);
app.post('/delManager',checkManagerDel);


app.post('/checkAll',CheckShipStocks);
app.post('/confirmShip',DelStocks);
app.get('/calculateLocation',calculateLocation);
app.get('/countStockFail',countStockFail);
app.get('/delmatchFail',delmatchFail);
app.get('/delStockSuccess',delStockSuccess);
app.get('/delEmpty',delEmpty);
app.get('/delUpdateCat',delUpdateCat);

app.post('/checkAdd',CheckAddStocks);
app.get('/calAvailAdd',calAvailAdd);
app.get('/checkEmptyCat',checkEmptyCat);
app.get('/sucAdd',sucAdd);
app.get('/addmatchFail',addmatchFail);
app.get('/notypeFail',notypeFail);

module.exports = app;

app.listen(port, ()=> console.log(`Listening on port ${port}`));