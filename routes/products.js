const ProductModel = require('../models/product.js'); 


const getAllProducts = (req, res) => {

    ProductModel.find({}, (err, products) => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: "Operation Failed" })
        }
        if (products) {
            // console.log(products)

            res.status(200).json({ products: products })
        }
    });
}

module.exports = getAllProducts;