const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated
const paginatedResults = require('../public/paginateResults').paginatedResults
const Word = require('../models/word')

router.get('/', checkAuthenticated, paginatedResults(Word) ,async (req, res) => { //

    let response = {}
    response.success = true
    response.content = res.paginatedResults
    response.error = {}
   console.log(response)
    res.json(response)
})

router.post('/', checkAuthenticated ,async (req, res) => {
    let response = {}
    console.log(req.body)
    let word = new Word({
        ownerId: req.user._id.toString(),
        content: req.body.content,
        phoneticReading: req.body.phoneticReading,
        meanings: req.body.meanings,
        example: req.body.example,
        labels: req.body.labels,
        knowledgeLevel: req.body.knowledgeLevel
    })
    try {
        response.content = await word.save()
        response.success = true
        response.error = {}
        res.json(response)
    } catch (error) {
        response.content = {}
        response.success = false
        response.error = error
        res.json(response)
    }
})

module.exports = router