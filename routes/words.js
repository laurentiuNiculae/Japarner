const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated

router.get('/', checkAuthenticated , async (req, res) => {
    res.render('words')
})



module.exports = router