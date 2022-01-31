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
    }
}