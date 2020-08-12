const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated
const paginatedResults = require('../public/paginateResults').paginatedResults
const Word = require('../models/word')

router.get('/', checkAuthenticated, paginatedResults(Word), async (req, res) => { //

    const response = {
        success: true,
        content: res.paginatedResults,
        error: {}
    }
    res.json(response)
})

router.post('/', checkAuthenticated, async (req, res) => {
    let response = {}
    console.log(req.body)

    if (await Word.exists({ content: req.body.content })) {
        response.content = {}
        response.success = false
        response.error = { message: "This word already exists" }
        console.log("exists!!!")
        res.json(response)
    } else {
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
    }
})

router.put('/', checkAuthenticated, async (req, res) => {
    let response = {}
    console.log(req.body)
    try {
        let currentWord = await Word.findOne({ ownerId: req.body.ownerId, content: req.body.content })
        currentWord.knowledgeLevel = req.body.knowledgeLevel
        currentWord.save()
        res.json({ content: {}, success: true, error: {} })
    } catch (error) {
        res.json({ content: {}, success: false, error: error })
    }

})

module.exports = router