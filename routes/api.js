const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated

const wordsRouter = require('./words')
const labelRouter = require('./labels')

router.use('/words',wordsRouter)
router.use('/labels',labelRouter)


module.exports = router