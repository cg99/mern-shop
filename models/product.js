//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    code: String,
    name: String,
    description: String,
    weight: String,
    image: String,
    price: {
        type: Number,
        required: true
    },
    available: Boolean,
    stock: {
        type: Number,
    }
});

//Export function to create "UserModel" model class
module.exports = mongoose.model('products', ProductSchema);