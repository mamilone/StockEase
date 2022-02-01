module.exports = {
    getManagerD: (req, res)=> {
        var username = req.session.username;
        if(req.session.loggedin === true && username)
        {
            id = req.session.userID;
            connection.query('select warehouse_id from manager where id = ?',[id], (error, result, fields) =>{
                req.session.wID = result[0].warehouse_id;
             })
            connection.query('Select * from manager where username = ?',[username], function (error, results, fields) {
                req.session.userID = results[0].id;
                id = req.session.userID;
                console.log(req.session);
                connection.query('select * from warehouse where id = (select warehouse_id from manager where id = ?)',[id], function (error, wResults, fields) {
                    let result = results[0];
                    let wResult = wResults[0];
                    console.log(result,wResults[0]);
                    res.render('mainmanager',{
                        result,wResult
                    })
                });
            });
        }
    },

    getshipment: (req, res)=>{
        res.render('mshipment')
    },
    getwarehouse: (req,res)=>{
        
        res.render('mwarehouse')
    },
    getrestock: (req,res)=>{
        res.render('mrestock')
    },
    getProductDetails: (req, res)=> {
        if(req.session.loggedin === true) {
            id = req.session.userID;
            console.log(req.session.userID);
            connection.query('select type from product group by type',[], (error, cresults, fields) =>{
                crlength = cresults.length;
                connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[id],(error, results, fields) =>{
                    rlength = results.length
                    console.log(results.length)
                    res.render('mproducts',{
                        results,rlength,cresults
                    })
                })
            })
        }
    }
}