const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
require('dotenv').config();
const routes = require('./routes/api.js')
const routeCheckout = require('./routes/checkout.js');


const app = express();
const port = process.env.PORT || 5000;
const db = process.env.DB;
console.log(db)


//connect to the database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;


// middleware for cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/api', routes);

app.use('/checkout', routeCheckout);

// middleware
app.use((err, req, res, next) => {
  console.log(err);
  next();
});


// listen to port
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`)
});