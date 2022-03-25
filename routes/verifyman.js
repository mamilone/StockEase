
module.exports = {
    verifym: (req, res) =>{
        var username = req.body.manuname;
        connection.query('select * from manager_verify where username = ?',[username], (error,results) =>{
            if(results.length > 0) {
                console.log(results);
                mname = results[0].name;
                email_id = results[0].email_id;
                password = results[0].password;
                wid = results[0].warehouse_id;
                connection.query('insert into manager (name,username,password,email_id,warehouse_id) values (?,?,?,?,?)',[mname,username,password,email_id,wid],(error,results) =>{
                    if(error) throw error;
                    else {
                        connection.query('delete from manager_verify where username = ?',[username], (error, results) => {
                            if(error) throw error
                            else {
                            res.redirect('/verifymadmin');
                            }
                        })
                    }
                })
            }
        })
    }, 

    remvman: (req, res) =>{
        var username = req.body.manuname;
        connection.query('select * from manager_verify where username = ?',[username], (error, results) =>{
            if(results.length > 0) {
                connection.query('delete from manager_verify where username = ?',[username], (error, results) =>{
                    if(error) throw error
                    res.redirect('/verifymadmin');
                })
            }
        })
    }
}