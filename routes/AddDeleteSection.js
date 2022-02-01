module.exports = {
    getSectionDetails: (req, res) =>{
        id = req.session.userID;
        connection.query('select * from section where warehouse_id = (select id from warehouse where admin_id = ?)',[id], (error, results, fields) =>{
            console.log(results);
            rlength = results.length
            console.log(rlength)
            res.render('secadmin',{
                results,rlength,
            });
        })
    }, 

    addSection: (req, res) =>{
        var name = req.body.sname;
        var type = req.body.stype;
        var count = req.body.scount;
        var wid = req.session.wID;
        connection.query('select * from product where name = ? && type = ?',[name,type], (error, results,fields) =>{
            console.log(results)
            if(results.length > 0)
            {
                res.redirect('/secadmin')
            } else {
                connection.query('insert into section (name,product_type,cat_count,warehouse_id) values (?,?,?,?)',[name,type,count,wid], (error, results, fields)=>{
                    console.log('result: '+results)
                    res.redirect('/secadmin')
                }) 
            }
        })
    }
}