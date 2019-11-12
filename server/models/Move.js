const mongoose = require('mongoose')

const moveSchema = new mongoose.Schema({
  move: {
    type: String,
    required: true
  },
  kills: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Moves', moveSchema)