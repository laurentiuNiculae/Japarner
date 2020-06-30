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
    },
    labels:{
        type: [String],
        required: false
    },
    knowledgeLevel : {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Word',wordSchema)