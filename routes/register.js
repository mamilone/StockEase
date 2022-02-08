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
        console.log(email,username);
        connection.query('Select username from admin where username = ?', [username], (error, results, fields)=> {
            console.log("error",error,"results",results,"fields",fields)
            if(results.length > 0) {
                response.redirect('adminCheckFail');
            } else {
                var email = request.body.Aemail;
                connection.query('Select email_id from admin where email_id = ?', [email], (error, results, fields)=> {
                    console.log(results);
                    if(results.length > 0) {
                        response.redirect('adminemailFail')
                    } else {             
                        connection.query('select * from warehouse where location = ?',[location], (error, results) =>{
                            if(results.length > 0) {
                            if(password == repassword) {
                                connection.query('insert into admin (username,email_id,password) values (?,?,?)', [username,email,password], (error, results, fields) =>{
                                    console.log("error",error,"results",results,"fields",fields)
                                    connection.query('Select id from admin where username = ?', [username], (error, result, fields)=> {
                                        console.log(result)
                                        var admin_id = result[0].id;
                                        connection.query('insert into warehouse (location,admin_id) values (?,?)', [location,admin_id], (error, results, fields) =>{
                                            if (error) throw error;
                                            else {
                                            response.redirect('gettologin')
                                            }
                                        }) 
                                    })
                                })
                            } else {
                                response.redirect('adminpassFail')
                            }
                        }
                        })
                    }
                })
            }
        })
    },

    ManRegCheck : (req, res) =>{
        var name = req.body.mname;
        var username = req.body.muname;
        var password = req.body.mpass;
        var repassword = req.body.mrpass;
        var email = req.body.memail;
        var wid = req.body.mwid;
        console.log(email,username);
        connection.query('Select username from manager where username = ?', [username], (error, results)=> {
            console.log("error",error,"results",results)
            if(results.length > 0) {
                res.redirect('manCheckFail');
            } else {
                connection.query('Select email_id from manager where email_id = ?', [email], (error, results)=> {
                    console.log(results);
                    if(results.length > 0) {
                        res.redirect('manemailFail')
                    } else {             
                        if(password == repassword) {
                            connection.query('select id from warehouse where id = ?',[wid],(error,results)=>{
                                console.log(results);
                                if(results.length > 0) {
                                    connection.query('insert into manager (name,username,email_id,password,warehouse_id) values (?,?,?,?,?)', [name,username,email,password,wid], (error, results, fields) =>{
                                        if(error) throw error
                                        else {
                                            res.redirect('gettologin');
                                        }
                                    })
                                } else {
                                    res.render('register',{
                                        title: 'register',
                                        registerMSG: 'Entered Warehouse ID does not Exist!'
                                    })
                                }
                            })
                        } else {
                            response.redirect('manpassFail')
                        }
                    }
                })
            }
        })
    },

    getEmailFail: (req, res) =>{
        res.render('register',{
            title:'register',
            registerMSG: 'email already in use by another User!!'
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