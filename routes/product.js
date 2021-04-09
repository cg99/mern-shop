const ProductModel = require('../models/product.js'); 


const getProduct = (req, res) => {
    const pID = req.params.id;

    ProductModel.find({ code: pID }, (err, product) => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: "Operation Failed" })
        }
        if (product) {
            // console.log(products)
            res.status(200).json({ product: product })
        }
    });
}

module.exports = getProduct;