module.exports = {
    getManagerD: (req, res)=> {
        res.render('mainmanager')
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
        id = req.session.mid;
        console.log(req.session.mid);
        connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[id],(error, results, fields) =>{
            rlength = results.length
            console.log(results.length)
            res.render('mproducts',{
                results,rlength
            })
        })
        
    }
}