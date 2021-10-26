const mongoose = require('mongoose');

const ClientsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true //whitespacesto be removed from both sides of the string 
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  company:{
    type: String,
    required: true,
    trim: true
  }, 

  email: {
    type: String,
    required: true,
    trim: true, 
    unique: true
  },

  phone: {
    type: String,
    trim: true,
  },

  created: {
    type: Date,
    default: Date.now()
  },

  salesman: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User',
  }
})

module.exports = mongoose.model('Client', ClientsSchema)