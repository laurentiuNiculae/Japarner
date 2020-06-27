const mongoose = require('mongoose')

const lableSchema = new mongoose.Schema({
    ownerId : {
        type: String,
        required : true
    },
    content : {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Lable',lableSchema)