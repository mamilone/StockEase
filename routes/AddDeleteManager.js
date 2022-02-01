module.exports = {
    getManagerAdd : (req, res) =>{

    },

    checkManagerDel: (req, res) =>{
        if(req.session.loggedin === true)
        {
            var id = req.body.manid;
            connection.query('delete from manager where id = ?',[id], (error, results, fields) =>{
                if(error) {
                    return res.status(500).send(error);
                }
                res.redirect('/madmin');
            })
        }
    }
};