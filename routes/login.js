module.exports={
    getLoginPage: (req, res) => {
        res.render('login',{
            title: 'Login',
            loginMSG:''
        })
    },


    manAuthCheck:(request, response) =>{
        var username = request.body.username;
        var password = request.body.password;
            connection.query('select * from manager where username = ? and password = ?', [username, password], function(error, results, fields, rows) {
                if(results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    request.session.mid = results[0].id;
                    response.redirect('/homemanager');
                } else {
                    request.session.loggedin = false;
                    response.redirect('/manAuthFail');
                }
                response.end();
            });
    },

    admAuthCheck:  (request,response)=> {
        var username = request.body.username1;
        var password = request.body.password1;
        if(username && password) {
            connection.query('select * from admin where username = ? and password = ?', [username, password], (error, results, fields) =>{
                if(results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    request.session.userID = results[0].id;
                    response.redirect('mainadmin');
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

    getFaillogin: (req, res) => {
        res.render('login',{
            title: 'Login',
            loginMSG: 'Incorrect Username and/or Password'
        });
    }
};