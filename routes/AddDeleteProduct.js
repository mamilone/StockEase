module.exports = {
    AddProduct: (req, res) => {
        if(req.session.loggedin === true)
        {
            var name = req.body.pname;
            var type = req.body.ptype;
            var id = req.session.wID;
            connection.query('select * from product where name = ? && type = ?',[name,type], (error, results, fields)=>{
                console.log(results);
                if(results.length > 0) {
                    res.redirect('/mproducts');
                } else {
                    connection.query('insert into product (name,type,warehouse_id) values (?,?,?)',[name,type,id], (error, results, fields) =>{
                        res.redirect('/mproducts')
                    })
                }
            })
        }
    },

    delProduct: (req, res) => {
        if(req.session.loggedin === true)
        {
            var id = req.body.pid;
            connection.query('delete from product where id = ?',[id], (error, results, fields) =>{
                if(error) {
                    res.redirect('/errordelproduct')
                } else {
                res.redirect('/mproducts');
                }
            })
        }
    },

    errordelproduct: (req, res) =>{
        if(req.session.loggedin === true) {
            id = req.session.userID;
            console.log(req.session.userID);
            connection.query('select type from product where warehouse_id = (select warehouse_id from manager where id = ?) group by type',[id], (error, cresults, fields) =>{
                crlength = cresults.length;
                connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[id],(error, results, fields) =>{
                    rlength = results.length
                    res.render('mproducts',{
                        results,rlength,cresults,crlength,
                        prodMSG : 'Items related to this product are stored in the Warehouse. A product cannot be deleted unless there are no items available for this product'
                    })
                })
            })
        }
    }
}