const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    ownerId : {
        type: String,
        required : true
    },
    content : {
        type: String,
        required : true
    },
    phoneticReading : {
        type: String,
        required: true
    },
    meanings : {
        type: [String],
        required: true
    },
    example : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Word',wordSchema)