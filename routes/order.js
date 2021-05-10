const OrderModel = require('../models/order.js'); 


const getOrders = (req, res) => {
    
    OrderModel.find({}, (err, orders) => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: "Operation Failed" })
        }
        if (orders) {
            // console.log(orders)

            res.status(200).json({ orders })
        }
    });
}

module.exports = getOrders;