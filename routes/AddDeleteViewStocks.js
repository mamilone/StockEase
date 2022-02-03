module.exports = {
    AddStocks: (req, res) =>{
    }, 

    ViewStocks: (req, res) => {
        if(req.session.loggedin === true) {
            mid = req.session.userID;
            wid = req.session.wID;
            var sresult = [], filled_slot = [] , avail_slot = [], total_slot= [], s_id = [];
            var cresult = [], wresult ;
            connection.query('select * from warehouse where id = ?',[wid], async(error, results, fields) =>{
                wresult = results[0];
                console.log(wresult)
                wlength = results.length;

                connection.query('select * from section where warehouse_id = ?',[wid], (error, results, fields) =>{
                    sresult = results;
                    console.log(sresult);
                    slength = sresult.length;

                    for( let i=0; i< results.length ; i++) {
                        s_id[i] = results[i].id;
                    }

                    connection.query('select * from category where section_id in (?)',[s_id], (error, results, fields) =>{
                        cresult = results;
                        clength = cresult.length;
                        total_slot = results;
                        temp_slot = results;

                        connection.query('select cat_number as category_number,section_id,count(*) as allot_size from stores where cat_number in (select category_number from category where section_id in (select id from section where warehouse_id = ?)) and section_id in (select id from section where warehouse_id = ?) group by cat_number,section_id',[wid,wid], (error, results, fields) =>{
                            filled_slot = results;
                            console.log(results)
                            
                            console.log("total",total_slot,"filled",filled_slot);
                            // console.log("avail",avail_slot);
                            res.render('mwarehouse',{
                                wresult,sresult,cresult,total_slot,filled_slot,wlength,slength,clength
                            });
                        })
                    })
                })
            })
        } else {
            res.redirect('/login');
        }
    }
}
