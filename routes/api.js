const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// models
const UserModel = require('../models/user.js'); 


// routes
const authenticateToken = require('./auth.js');
const getAllProducts = require('./products.js');
const getProduct = require('./product.js');
const getAllOrders = require('./order.js');




const bcrypt = require('bcrypt');               // Importing the NPM bcrypt package.
const saltRounds = 10;                          // We are setting salt rounds, higher is safer.
const jwt = require('jsonwebtoken');               //Importing the NPM bcrypt package.
require('dotenv').config();



// create application/json parser
const jsonParser = express.json()

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
// })

// define the home page route
router.get('/', function (req, res) {
    res.send('Api home page')
})


// all products
router.get('/products', getAllProducts, function (req, res) {
    res.status(200).send({ success: true })
})

// one product
router.get('/product/:id', getProduct, function (req, res) {
    res.status(200).send({ success: true })
})


// all orders
router.get('/orders', getAllOrders, function (req, res) {
    res.status(200).send({ success: true })
})


// signup
router.post('/signup', jsonParser, function (req, res) {
    const bd = req.body;

    const plainPassword = bd.password;   //Unprotected password

    /* Here we are getting the hashed password from the callback,
    we can save that hash in the database */
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
        if (!err) {
            bd.password = hash;
            // Create an instance of model SomeModel
            const userModel = new UserModel(bd);

            // Save the new model instance, passing a callback
            userModel.save(function (err) {
                const handleError = (error) => {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        return res.send({ success: false, message: 'duplicate' });
                    }
                    // Some other error
                    return res.status(422).send(err);
                }

                if (err) return handleError(err);

                res.status(200).send({ success: true, message: 'User was added.' })
            });
        } else {
            console.log(err);
        }
    });
})


// signin
router.post('/signin', jsonParser, function (req, res) {
    const { email, password: plainPassword } = req.body;

    UserModel.findOne({ 'email': email }, (err, user) => {
        if (err) return handleError(err);
        if (user) {
            /* Here we can compare the hashed password after we get it from the database with the plaintext password */
            bcrypt.compare(plainPassword, user.password, function (error, response) {
                if (response) {
                    const payload = { "email": user.email };
                    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

                    res.status(200).send({ success: true, message: 'Sign In Successful', accessToken: token });
                } else {
                    res.status(401).send({ success: false, message: 'Sign In Failed' })
                }
            });
        }
    })
})



// authenticate
router.get('/auth', authenticateToken, (req, res) => {
    res.status(200).send({ success: true });
})

module.exports = router