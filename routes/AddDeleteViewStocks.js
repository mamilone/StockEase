module.exports = {
    AddStocks: (req, res) =>{
    }, 

    ViewStocks: (req, res) => {
        if(req.session.loggedin === true) {
            mid = req.session.userID;
            wid = req.session.wID;
            let sresult = [];
            let cresult = [];
            connection.query('select * from warehouse where id = ?',[wid], (error, results, fields) =>{

            })
            connection.query('select * from section where warehouse_id = ?',[wid], (error, results, fields) =>{
                srlength = results.length;
                for( let i = 0; i < results.length; i++) {
                    sec_id = results[i].id;
                    sresult.push(results[i])
                    connection.query('select * from category where section_id = ?',[sec_id], (error, results, fields) =>{
                        crlength = results.length;
                        for( let j = 0; j < results.length ; j++) {
                            cat_id = results[i].id;
                            cresult.push(results[i])
                            connection.query('select count(*) from stores where category_id = ? && group by ')
                        }
                    })
                }
            })
        }
    }
}