var mysql = require('mysql');
var express = require('express');
const exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const  response  = require('express');
const { request } = require('http');

require('dotenv').config();

var app = express();
const port = process.env.PORT || 5000;



const pool = mysql.createPool({
    connectionLimit: 10,
    host           : 'localhost',
    user           : 'root',
    password       : 'MohammedAimon@41',
    database       : 'stock-ease'
});

app.get('', (req, res) => {

    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connected as id ${connectoin.threadId}`)

        connection.query('Select * from admin', (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.listen(port, ()=> console.log(`Listen on port ${port}`))