module.exports = {
    getSectionDetails: (req, res) =>{
        if(req.session.loggedin === true) {
            id = req.session.userID;
            connection.query('select type from product group by type',[], (error, cresults, fields) =>{
            crlength = cresults.length;
            connection.query('select * from section where warehouse_id = (select id from warehouse where admin_id = ?)',[id], (error, results, fields) =>{
                rlength = results.length
                res.render('secadmin',{
                    results,rlength,crlength,cresults
                });
            })
            })
        }
    }, 

    addSection: (req, res) =>{
        if(req.session.loggedin === true) {
            var name = req.body.sname;
            var type = req.body.stype;
            var count = req.body.scount;
            var wid = req.session.wID;
            var cat_count = req.body.cat_count;
            console.log(name,type,wid);
            connection.query('select * from section where name = ? && product_type = ?',[name,type], (error, results,fields) =>{
                console.log(results)
                if(results.length > 0)
                {
                    res.redirect('/secadmin')
                } else {
                    connection.query('insert into section (name,product_type,cat_count,warehouse_id) values (?,?,?,?)',[name,type,count,wid], (error, results, fields)=>{
                        console.log(error);
                        connection.query('select * from section where name = ? && product_type = ? && warehouse_id = ?',[name,type,wid], (error, results,fields) =>{
                        console.log(results);
                        sec_id = results[0].id;
                        let i;
                        for( i=1 ; i <= count ; i++) {
                            connection.query('insert into category (category_number,section_id,allot_size) values (?,?,?)',[i,sec_id,cat_count], (error, results, fields) =>{
                                console.log(error);
                            })
                        }
                        res.redirect('/secadmin'); 
                        })
                    }) 
                }
            })
        }
    }, 

    delSection: (req, res) =>{
        var sec_id = req.body.secID;
        if(req.session.loggedin === true) {
            connection.query('delete from section where id = ?',[sec_id], (error, results, fields) =>{
                if(error) {
                    throw error
                } else {
                    res.redirect('/secadmin')
                }
            })
        }
    }
}