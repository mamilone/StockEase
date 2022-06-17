module.exports={
    
//renders login page
    getLoginPage: (req, res) => {
        req.session.loggedin = false;
        console.log(req.session);
        res.render('login',{
            loginMSG:''
        })
    },

//manager(user) Authentication Check
    manAuthCheck:(request, response) =>{
        var username = request.body.username;
        var password = request.body.password;
        connection.query('select * from manager_verify where username = ? and password = ?',[username,password], (error, results) =>{
            if(results.length > 0) {
                response.render('waitmanverify',{
                    manMSG : 'Wait'
                })
            } else {
                connection.query('select * from manager where username = ? and password = ?', [username, password], (error, results) =>{
                    if(results.length > 0) {
                        request.session.loggedin = true;
                        request.session.username = username;
                        request.session.userID = results[0].id;
                        request.session.role = 'Manager';
                        console.log(request.session);
                        response.redirect('/mainmanager');
                    } else {
                        request.session.loggedin = false;
                        response.redirect('/manAuthFail');
                    }
                    response.end();
                });
            }
        })
    },

//admin authentication check
    admAuthCheck:  (request,response)=> {
        var username = request.body.username1;
        var password = request.body.password1;
        if(username && password) {
            connection.query('select * from admin where username = ? and password = ?', [username, password], (error, results, fields) =>{
                if(results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    request.session.userID = results[0].id;
                    response.redirect('/mainadmin');
                } else {
                    request.session.loggedin = false;
                    response.redirect('/admAuthFail');
                }
                response.end();
            });
        }   else {
                response.redirect('/admAuthFail')
                response.end();
        }
    },

//function to execute if login failed
    getFaillogin: (req, res) => {
        res.render('login',{
            loginMSG: 'Incorrect Username and/or Password'
        });
    },

//this function got called from other page routers to logout from the site and direct to login
    getLogoutCheck: (req,res)=>{
        if(req.session.loggedin === true) {
        req.session.loggedin = false;
        console.log(req.session);
        res.redirect('/login');
        }
    }
};

/*i havent implimented proper security feature,
 i.e. if i login as user and use a url related to admin, i can get access to admin pages but there wont be that much of an information displayed. */