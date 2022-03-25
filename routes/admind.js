module.exports = {
    getAdminDetail : (req, res)=> {
        var username = req.session.username;
        if(req.session.loggedin === true && username)
        {
            id = req.session.userID;
            connection.query('select id from warehouse where admin_id = ?',[id], (error, result, fields) =>{
                req.session.wID = result[0].id;
             })
            connection.query('select * from warehouse where admin_id = ?',[id], function (error, results, fields) {
                connection.query('Select * from admin where username = ?',[username], function (error, wresults, fields) {
                    let result = results[0];
                    let wresult = wresults[0];
                    console.log(result,wresults[0]);
                    res.render('mainadmin',{
                        result,wresult
                    })
                });
            });
        }
    } ,

    getManagerDetails : (req, res)=> {
        if(req.session.loggedin === true) {
            id = req.session.userID;
            console.log(req.session)
            connection.query('select * from manager where warehouse_id = (select id from warehouse where admin_id = ?)',[id],(error, result, fields) =>{
                console.log(result)
                rlength = result.length
                res.render('madmin',{
                    result,rlength
                })
            })
        }
    } ,

    getLogs: (req, res) =>{
        if(req.session.loggedin === true) {
            wid = req.session.wID;
            console.log(id,wid)
            connection.query('select m.name as manager,p.name as product,l.laction,l.ldate from logs l,manager m,product p where l.pid = p.id and l.manager_id = m.id and manager_id IN (select id from manager where warehouse_id = ?)',[wid],(error,results)=>{
                res.render('logsadmin',{
                    results
                })
            })
        }
    },

    delLogs: (req, res) =>{
        if(req.session.loggedin === true) {
            wid = req.session.wID;
            connection.query('delete from logs where manager_id in (select id from manager where warehouse_id = ?)',[wid], (error, results)=>{
                if(error) throw error;
                else
                res.redirect('/logsadmin');
            })
        } else {
            res.redirect('/login');
        }
    },

    getvmdetail : (req, res) =>{
        if(req.session.loggedin === true) {
            var id = req.session.userID;
            connection.query('select * from manager_verify where warehouse_id = (select id from warehouse where admin_id = ?)',[id], (error, results) =>{
                if(results.length > 0) {
                    res.render('verifymadmin',{
                        results,
                        verifyMSG : ''
                    })
                } else {
                    res.render('verifymadmin',{
                        results,
                        verifyMSG : 'Empty'
                    })
                }
            })
        }
    }
}