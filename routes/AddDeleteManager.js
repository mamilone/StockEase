
module.exports = {
    ManagerAdd : (req, res) =>{
        if(req.session.loggedin === true) {
            var name = req.body.mname;
            var uname = req.body.muname;
            var email = req.body.memail;
            var pass = req.body.mpass;
            var wid = req.session.wID;
            connection.query('select * from manager where username = ?',[uname], (error,results,fields)=>{
                if(results.length > 0) {
                    res.redirect('/madmin');
                }
            })
            connection.query('select * from manager where email_id = ?',[email], (error, results, fields) =>{
                if(results.length > 0) {
                    res.redirect('/madmin');
                }
            })
            connection.query('insert into manager (name,username,password,email_id,warehouse_id) values (?,?,?,?,?)',[name,uname,pass,email,wid], (error, results, fields) =>{
                if(error) {
                    throw error;
                } else {
                    res.redirect('/madmin');
                }
            })
        }
    },

    checkManagerDel: (req, res) =>{
        if(req.session.loggedin === true)
        {
            var id = req.body.manid;
            connection.query('delete from manager where id = ?',[id], (error, results, fields) =>{
                if(error) {
                    return res.status(500).send(error);
                } else {
                res.redirect('/madmin');
                }
            })
        }
    }
};