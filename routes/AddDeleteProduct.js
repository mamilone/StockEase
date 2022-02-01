const Connection = require("mysql/lib/Connection");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

module.exports = {
    getAdminAddProduct: (req, res) => {
        if(req.session.loggedin === true)
        {
            result = [
                Pname = "Enter the Name of the product",
                price = "Enter the price",
                category = "Enter the Type of product (e.g. dove is categorized as essentials)",
            ]
            res.render('Aadd')
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