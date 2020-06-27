const express = require('express')
const router = express.Router()
const checkAuthentificated = require('../public/checkAuthentificated').checkAuthentificated

const wordsRouter = require('./words')
const categoriesRouter = require('./categories')

router.use('/words',wordsRouter)
router.use('/categories',categoriesRouter)


module.exports = router