module.exports = {
    getAdminDetail : (req, res)=> {
        var username = req.session.username;
        if(req.session.loggedin === true && username)
        {
            connection.query('Select * from admin where username = ?',[username], function (error, results, fields) {
                req.session.userID = results[0].id;
                id = req.session.userID;
                console.log(req.session);
                connection.query('select * from warehouse where admin_id = ?',[id], function (error, wResults, fields) {
                    let result = results[0];
                    let wResult = wResults[0];
                    console.log(result,wResults[0]);
                    res.render('mainadmin',{
                        result,wResult
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