const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    trim: true //whitespacesto be removed from both sides of the string 
  }, 
  lastName: {
    type: String,
    required: true,
    trim: true, 
  }, 
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date, 
    default: Date.now()
  },
})

module.exports = mongoose.model('User', UsersSchema) 