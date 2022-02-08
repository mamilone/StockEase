var cresult = [], count,scount=[], category = [] , section_id =[], clength, section_name = [], mid;
var name,type;

module.exports = {
    ViewStocks: (req, res) => {
        if(req.session.loggedin === true) {
            mid = req.session.userID;
            wid = req.session.wID;
            var sresult = [], filled_slot = [], total_slot= [], s_id = [];
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
    },

    CheckShipStocks: (req, res) =>{  
        if(req.session.loggedin === true ) {
            type = req.body.ptype;
            mid = req.session.userID;
            name = req.body.pname;
            count = req.body.pcount;
            console.log("name",name,"type",type)
             connection.query('select c.category_number,c.section_id,c.product_id,c.product_name,s.name from category c,section s where s.id = c.section_id and product_id = (select id from product where name = ? and type = ?) and s.warehouse_id = (select warehouse_id from manager where id = ?)',[name,type,mid], (err, results) =>{
                if(err) throw err
                if(results.length > 0) {
                setValue(results)
                } else {
                    res.redirect('/delmatchFail')
                    console.log('i Have no Idea !!')
                }
            })

            function setValue (value){
                console.log("value",value)
                var wid = req.session.wID;
                cresult = value;
                clength = cresult.length;
                connection.query('select count(*) as count,cat_number as category_number,section_id from stores where cat_number in (select category_number from category where product_id = (select id from product where name = ? and type = ?) and section_id in (select id from section where warehouse_id = ?)) and section_id in (select section_id from category where product_id = (select id from product where name = ? and type = ?) and section_id in (select id from section where warehouse_id = ?)) group by category_number,section_id',[name,type,wid,name,type,wid], (error, results) =>{
                    console.log("result",results)
                    if(results.length > 0) {
                        for( var i =0; i < cresult.length ; i++) {
                            for(var j = 0 ; j < results.length ; j++) {
                        // console.log("test",i,cresult[i].category_number,results,results[0].category_number);
                                if((cresult[i].category_number === results[j].category_number) && (cresult[i].section_id === results[j].section_id)) {
                                    cresult[i]['count'] = results[j].count

                                }
                            }
                        }
                        console.log(cresult);
                        res.redirect('calculateLocation')
                    } else {
                        res.redirect('delEmpty')
                    }
                })
            }
            
        }
    
            
    },

    calculateLocation : (req, res) =>{
        if(cresult.length > 0) { 
            scount=[], category = [] , section_id =[];
            if(count == 0) {  
                res.redirect('/countStockFail')
                console.log("Enter the quantity First !") 
            } else { 
                for(var i = 0 ; i < cresult.length ; i++) {
                    if(cresult[i].count) {
                        if(cresult[i].count == 0) { 
                                continue;
                        } else if(count <= cresult[i].count) {
                            scount.push(count);
                            category.push(cresult[i].category_number); 
                            section_id.push(cresult[i].section_id);
                            section_name.push(cresult[i].name) 
                            console.log("elseif count",count); 
                            console.log(count," items from category ",cresult[i].category_number," stored in section ",cresult[i].name);
                            count = 0;
                            break;
                        } else if(count == 0) {
                            break;
                        } else {  
                            if(count > 0) { 
                                scount.push(cresult[i].count); 
                                category.push(cresult[i].category_number);
                                section_id.push(cresult[i].section_id);
                                section_name.push(cresult[i].name); 
                                console.log("elsecount",cresult[i].count);
                                console.log(cresult[i].count," items from category ",cresult[i].category_number," stored in section ",cresult[i].name)
                                count = count - cresult[i].count 
                                console.log(count);
                            } 
                        }
                    } 
                } 
            }
            setTimeout(checkShip,200);
            function checkShip() {
                console.log(scount,category,section_name,section_id); 
                res.render('checkShip',{
                    scount, category, section_name, clength, count
                })
            }
        } 
    },

    DelStocks: (req, res) =>{
        console.log(scount,category,section_id)
        connection.query('select item_id from stores where cat_number in (?) and section_id in (?)',[category,section_id], (err, res)=>{
            if(err) throw err
            else{
            console.log(res)
            setValue(res);
            }
        })
        function setValue(resu) {
            var ires = resu;
            var sscount = 0;
            for(var i=0; i<scount.length; i++) {
                sscount = sscount+scount[i];
            }
            console.log("count",sscount);
            for( var j=sscount,k=0 ; j > 0 ; j--,k++) {
                connection.query('delete from items where item_id = ?',[ires[k].item_id], (err,res)=>{
                    if(err) throw err
                })
            }
            res.redirect('/delUpdateCat');
        }
                
    },

    countStockFail:(req, res) =>{
        if(req.session.loggedin === true) {
            var mid = req.session.userID;
            var cresult = [],count = 0;
            connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (error, results, fields) =>{
                // console.log(results)
                presult = results;
                connection.query('select type from product where warehouse_id = (select warehouse_id from manager where id = ?) group by type',[mid], (error, results, fields) =>{
                    // console.log(results);
                    tresult = results;
                    ptype = results;
                    res.render('mshipment',{
                        presult,tresult,cresult,count,
                        shipMSG: 'Failure'
                    })
                })
            })
        }
    },

    delStockSuccess: (req, res) =>{
        if(req.session.loggedin === true) {
            var mid = req.session.userID;
            var cresult = [],count = 0;
            connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (error, results, fields) =>{
                // console.log(results)
                presult = results;
                connection.query('select type from product where warehouse_id = (select warehouse_id from manager where id = ?) group by type',[mid], (error, results, fields) =>{
                    // console.log(results);
                    tresult = results;
                    ptype = results;
                    res.render('mshipment',{
                        presult,tresult,cresult,count,
                        shipMSG : 'Success'
                    })
                })
            })
        }
    }, 

    delmatchFail : (req, res) =>{
        if(req.session.loggedin === true) {
            var mid = req.session.userID;
            var cresult = [],count = 0;
            connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (error, results, fields) =>{
                presult = results;
                connection.query('select type from product where warehouse_id = (select warehouse_id from manager where id = ?) group by type',[mid], (error, results, fields) =>{
                    tresult = results;
                    ptype = results;
                    res.render('mshipment',{
                        presult,tresult,cresult,count,
                        shipMSG : 'MatchFail'
                    })
                })
            })
        }
    }, 

    delEmpty: (req, res) =>{
        if(req.session.loggedin === true) {
            var mid = req.session.userID;
            var cresult = [],count = 0;
            connection.query('select * from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (error, results, fields) =>{
                // console.log(results)
                presult = results;
                connection.query('select type from product where warehouse_id = (select warehouse_id from manager where id = ?) group by type',[mid], (error, results, fields) =>{
                    // console.log(results);
                    tresult = results;
                    ptype = results;
                    res.render('mshipment',{
                        presult,tresult,cresult,count,
                        shipMSG : 'Empty'
                    })
                })
            })
        }
    },

    delUpdateCat: (req, res) =>{
        mid = req.session.wID;
        connection.query('select * from category where product_id = (select id from product where name = ? and type = ? ) and section_id in (select id from section where warehouse_id = ? ) and category_number not in (select cat_number from stores where cat_number in (select category_number from category where product_id = (select id from product where name = ? and type = ?)) and section_id in (select section_id from category where product_id = (select id from product where name = ? and type = ? ))group by cat_number,section_id)',[name,type,wid,name,type,name,type], (err, results)=>{
            console.log("empty",results);
            if(results.length > 0) { 
                for (var i = 0 ; i < results.length ; i++) {
                    connection.query('update category set product_id = null, product_name = \'\' where category_number = ? and section_id = ?',[results[i].category_number,results[i].section_id], (err, results) =>{
                        if(err) throw err;
                    })
                }
            }
        })
        setTimeout(succDel,100);
        function succDel() {
            res.redirect('/delStockSuccess');
        }
    }
}