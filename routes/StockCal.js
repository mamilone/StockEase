var $ = require('jquery');
var name,ttype,num,mid,wid;
module.exports = {
    calAvailAdd : (req, res) =>{
        if(req.session.loggedin === true){
            console.log("mid",mid);
            connection.query('select count(*) as count,c.product_id,s.cat_number as category_number,s.section_id,c.allot_size from stores s,category c where s.cat_number=c.category_number and s.section_id = c.section_id and c.product_id = (select id from product where name = ? and type = ?) and c.section_id in (select id from section where warehouse_id = (select warehouse_id from manager where id = ?)) group by s.cat_number,s.section_id',[name,ttype,mid], (error,results)=>{
                console.log("first",results);
                if(results.length > 0 ) {
                    var cat ,sec ;
                    var pid = results[0].product_id;
                    for( var i = 0 ; i < results.length ; i++) {
                        avail = results[i].allot_size - results[i].count;
                        total = results[i].allot_size;
                        count = results[i].count;
                        cat = results[i].category_number;
                        sec = results[i].section_id;
                        console.log('avail',avail,'allot',results[i].allot_size,'count',results[i].count);
                        (function(cat,sec,avail,pid){
                        while(avail >0 && num>0) {
                            connection.query('insert into items (product_id,manager_id) values (?,?)',[pid,mid], (err,resu,fields,rows)=>{
                                if (err) throw err
                                console.log(resu.insertId);
                                item = resu.insertId;
                                console.log("cat",cat,"sec",sec);
                                connection.query('insert into stores (item_id,cat_number,section_id) values (?,?,?)',[item,cat,sec], (error, results) =>{
                                    if(error) throw error;
                                    else console.log(results);
                                })
                            })
                            avail--;
                            num--;
                            if(num == 0) {
                                break;
                            }
                        }
                        })(cat,sec,avail,pid);
                    }
                    setTimeout(CheckNum,400)
                    function CheckNum () {
                        if(num == 0) {
                            console.log("Sucess")
                            res.redirect('sucAdd');
                        } else {
                            res.redirect('/checkEmptyCat');
                        }
                    }
                } else {
                    res.redirect('/checkEmptyCat')
                }
            })
        } else {
            res.redirect('login');
        }
    },

    checkEmptyCat:(req, response) =>{
        if(req.session.loggedin === true) {
            console.log(num,ttype,name);
            connection.query('select * from category where product_id is null and section_id in (select id from section where product_type = ?)',[ttype], (error, results) =>{
                if(error) throw error;
                connection.query('select id from product where name = ? and type = ?',[name,ttype],(err,resu)=>{
                    if(err) throw err;
                    var pid = resu[0].id;
                    if(results.length > 0) {
                        console.log(results);
                        var cat,sec;
                        var vary = results;
                        for(var i = 0 ; i < results.length ; i++) {
                            count = vary[i].allot_size;
                            cat = vary[i].category_number;
                            sec = vary[i].section_id;
                            console.log(count,pid,cat,sec);
                            (async function(cat,sec,count,pid){
                                if(num > 0) {
                                    console.log("name",name,"type",ttype);
                                            while(num > 0 && count > 0) {
                                                await connection.query('insert into items (product_id,manager_id) values (?,?)',[pid,mid],(err,res)=>{
                                                    if(err) throw err;
                                                    console.log(res.insertId);
                                                    item = res.insertId;
                                                    console.log("cat",cat,"sec",sec);
                                                        connection.query('insert into stores (item_id,cat_number,section_id) values (?,?,?)',[item,cat,sec], (error, results) =>{
                                                            if(error) throw error;
                                                            else console.log(results);
                                                        })
                                                })
                                                console.log("num--,count--");
                                                num--;
                                                count--;
                                            }
                                            connection.query('update category set product_name = ?,product_id = (select id from product where name = ? and type = ?) where category_number = ? and section_id = ?',[name,name,ttype,cat,sec], (error,res)=>{
                                                console.log(res)
                                            })
                                }
                            })(cat,sec,count,pid);
                        }
                        setTimeout(checkNum,200)
                        function checkNum () {
                            if(num == 0) {
                                console.log(num,'success')
                                response.redirect('sucAdd');
                            } else {
                                console.log(num,'Fail');
                                response.redirect('sucAdd')
                            }
                        } 
                    } else {
                        response.redirect('notypeFail');
                    }
                })
            })
        } else {
            response.redirect('login');
        }
    },

    CheckAddStocks : (req, res) =>{
        if(req.session.loggedin === true) {
            name = req.body.pname;
            ttype = req.body.ptype;
            num = req.body.pnum;
            mid = req.session.userID;
            console.log(name,ttype,num);
            connection.query('select * from product where name = ? and type = ?',[name,ttype], (error, results) =>{
                if(results.length > 0){
                    connection.query('select count(*) as count,s.cat_number as category_number,s.section_id,c.allot_size from stores s,category c where s.cat_number=c.category_number and s.section_id = c.section_id and c.product_id = (select id from product where name = ? and type = ?) and c.product_id = (select id from product where name = ? and type = ?) group by s.cat_number,s.section_id',[name,ttype,name,ttype], (error,results)=>{
                        if(error) throw error;
                        if(results.length > 0){
                            console.log('successresult',results)
                            res.redirect('calAvailAdd')
                        }
                        else {
                            connection.query('select * from category where product_id is null and section_id = (select id from section where product_type = ?)',[ttype],(error, results) =>{
                                if(results.length > 0) {
                                console.log('result',results);
                                res.redirect('calAvailAdd')
                                } else {
                                    res.redirect('notypeFail');
                                }
                            })
                        }
                    })
                } else {
                    console.log('Enter correct product name and type');
                    res.redirect('/addmatchFail');
                }
            })
        } else {
            res.redirect('login');
        }
    }, 

    notypeFail: (req, res) =>{
        if(req.session.loggedin === true) {
            var name=[],type=[],num = 0;
            wid = req.session.wID;
            connection.query('select name from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (err, results)=>{
                name = results;
                connection.query('select type from product where warehouse_id = ? group by type',[wid], (err, results)=>{
                    type = results;
                    res.render('mrestock',{
                        name,type,num,$,ttype,
                        stockMSG: 'Failure'
                    })
                })
            })
        }
    },

    sucAdd: (req, res) =>{
        if(req.session.loggedin === true) {
            var name=[],type=[]
            wid = req.session.wID;
            connection.query('select name from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (err, results)=>{
                name = results;
                console.log("name",name)
                connection.query('select type from product where warehouse_id = ? group by type',[wid], (err, result)=>{
                    type = result;
                    console.log("type",type)
                    res.render('mrestock',{
                        name,type,num,$,ttype,
                        stockMSG:'Success'
                    })
                })
            })
        }
    }, 

    addmatchFail: (req, res) =>{
        if(req.session.loggedin === true) {
            var name=[],type=[]
            connection.query('select name from product where warehouse_id = (select warehouse_id from manager where id = ?)',[mid], (err, results)=>{
                name = results;
                console.log("name",name)
                connection.query('select type from product group by type',[], (err, result)=>{
                    type = result;
                    console.log("type",type)
                    res.render('mrestock',{
                        name,type,num,$,ttype,
                        stockMSG:'matchFail'
                    })
                })
            })
        }
    }
}