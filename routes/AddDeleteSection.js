module.exports = {
    getSectionDetails: (req, res) =>{
        id = req.session.userID;
        connection.query('select * from section where warehouse_id = (select id from warehouse where admin_id = ?)',[id], (error, results, fields) =>{
            console.log(results);
            rlength = results.length
            console.log(rlength)
            res.render('secadmin',{
                results,rlength
            });
        })
    }
}