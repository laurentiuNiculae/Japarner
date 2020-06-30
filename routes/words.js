const express = require('express')
const router = express.Router()
const Word = require('../models/word')
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated

router.get('/', checkAuthenticated , async (req, res) => {

    let userWords = await Word.find({ownerId: req.user._id.toString()})

    res.render('words', {words:userWords})

})



module.exports = router