const mongoose = require('mongoose')

const labelSchema = new mongoose.Schema({
    ownerId : {
        type: String,
        required : true
    },
    content : {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Label',labelSchema)