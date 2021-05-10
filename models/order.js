//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    shipping: {
        address: {
            primary_address: String,
            secondary_address: String,
            city: String,
            state: String,
            country: String,
            zip_code: String,

        },
        cost: Number
    },
    contact: {
        email: String,
        phone: String
    },
    billing: {
        payment_method: String,
        total_price: Number
    },
    order_date: Date,
    item: String,
    quantity: Number,
    p_code: String,
    price: Number
});

//Export function to create "OrderModel" model class
module.exports = mongoose.model('orders', OrderSchema);