const { CLIENT_SECURE_CONNECTION } = require("mysql/lib/protocol/constants/client");

module.exports = {
    getRegisterPage: (req, res)=> {
        res.render('register',{
            title: 'register',
            registerMSG: ''
        })
    },

    AdminCheck:(request, response)=> {
        var username = request.body.Ausername;
        var password = request.body.Apassword;
        var repassword = request.body.Arpassword;
        var location = request.body.Alocation;
        var email = request.body.Aemail;
        connection.query('Select username from admin where username = ?' [username], (error, results, fields)=> {
            if(results) {
                response.redirect('adminCheckFail');
            }
        })
        connection.query('Select * from admin where email_id = ?', [email], (error, results, fields)=> {
            if(results) {
                response.send('Email already used by another admin!');
                response.redirect('adminemailFail')
            }
        })
        if(password == repassword) {
            connection.query('insert into admin (username,email,password) values (?,?,?)', [username,email,password], function (error, results, fields) {
                connection.query('Select id from admin where username = ?', [username], (error, result, fields)=> {
                    console.log(result)
                    var admin_id = result[0].id;
                    connection.query('insert into warehouse (location,admin_id) values (?,?,?)', [location,admin_id], (error, results, fields) =>{
                        response.redirect('gettoLogin')
                    }) 
                })
            })
        } else {
            response.redirect('adminpassFail')
        }
        
    },

    getEmailFail: (req, res) =>{
        res.render('register',{
            title:'register',
            registerMSG: 'email already in use by another Admin!!'
        })
    },

    getUserFail: (req, res) => {
        res.render('register',{
            title:'register',
            registerMSG: 'Username already Exists!!'
        })
    },

    getPassFail: (req, res)=>{
        res.render('register',{
            title:'register',
            registerMSG: 'Please Confirm your password'
        })
    }
}