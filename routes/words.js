const express = require('express')
const router = express.Router()
const Word = require('../models/word')
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated

router.get('/', checkAuthenticated , async (req, res) => {


    res.render('words', {words:[{content:'bunica'},　{content:'差べぁ'}]})

})



module.exports = router