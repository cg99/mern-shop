//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    min: [6, 'Too few characters'],
    max: 50,
    required: true
  }
});

//Export function to create "UserModel" model class
module.exports = mongoose.model('users', UserSchema);