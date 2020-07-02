const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated

const wordsRouter = require('./apiWords')
const labelRouter = require('./apiLabels')

router.use('/words',wordsRouter)
router.use('/labels',labelRouter)


module.exports = router