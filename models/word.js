const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    content : {
        type: String,
        required : true
    },
    phoneticReading : {
        type: String,
        required: true
    },
    meaning : {
        type: String,
        required: true
    },
    example : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Word',wordSchema)