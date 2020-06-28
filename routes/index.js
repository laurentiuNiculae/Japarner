const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated

router.get('/', checkAuthenticated ,(req, res) => {
    res.render('index', {name: req.user.name})

})



module.exports = router