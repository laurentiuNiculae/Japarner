const express = require('express')
const router = express.Router()
const checkAuthentificated = require('../public/checkAuthentificated').checkAuthentificated

router.get('/', checkAuthentificated ,(req, res) => {
    res.render('index', {name: req.user.name})

})


module.exports = router