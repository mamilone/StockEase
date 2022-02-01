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
        id = req.session.userID;
        console.log(req.session)
        connection.query('select * from manager where warehouse_id = (select id from warehouse where admin_id = ?)',[id],(error, result, fields) =>{
            console.log(result)
            rlength = result.length
            res.render('madmin',{
                result,rlength
            })
        })
    } ,

    getSuggestion : (req, res) => {
        res.render('sadmin')
    }
}