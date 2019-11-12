const mongoose = require('mongoose')

const rankingSchema = new mongoose.Schema({
    player: {
        type: String,
        required: true
    },
    victories: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Ranking', rankingSchema)