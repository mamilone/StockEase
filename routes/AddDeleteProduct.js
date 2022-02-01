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
                    return res.status(500).send(error);
                }
                res.redirect('/mproducts');
            })
        }
    }
}