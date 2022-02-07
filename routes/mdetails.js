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
                    res.render('mainmanager',{
                        result,wResult
                    })
                });
            });
        }
    },

    getshipment: (req, res)=>{
        if(req.session.loggedin === true) {
            var mid = req.session.userID;
            var cresult = [],count = 0;
            connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (error, results, fields) =>{
                // console.log(results)
                presult = results;
                connection.query('select type from product group by type',[], (error, results, fields) =>{
                    // console.log(results);
                    tresult = results;
                    ptype = results;
                    res.render('mshipment',{
                        presult,tresult,cresult,count
                    })
                })
            })
        }
    },


    getrestock: (req,res)=>{
        if(req.session.loggedin === true) {
            var mid = req.session.userID;
            var name=[],type=[], num = 0, ttype = '';
            connection.query('select name from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (err, results)=>{
                name = results;
                connection.query('select type from product group by type',[], (err, results)=>{
                    type = results;
                    res.render('mrestock',{
                        name,type,num,ttype,
                        stockMSG: ''
                    })
                })
            })
        }
    },

    getrestockSuccess: (req,res)=>{
        if(req.session.loggedin === true) {
            var mid = req.session.userID;
            var name=[],type=[]
            connection.query('select name from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (err, results)=>{
                name = results;
                connection.query('select type from product group by type',[], (err, results)=>{
                    type = results;
                    res.render('mrestock',{
                        name,type,
                        stockMSG: 'Items Added Succeessfully'
                    })
                })
            })
        }
    },

    getProductDetails: (req, res)=> {
        if(req.session.loggedin === true) {
            id = req.session.userID;
            console.log(req.session.userID);
            connection.query('select type from product group by type',[], (error, cresults, fields) =>{
                crlength = cresults.length;
                connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[id],(error, results, fields) =>{
                    rlength = results.length
                    res.render('mproducts',{
                        results,rlength,cresults,crlength
                    })
                })
            })
        }
    }
}