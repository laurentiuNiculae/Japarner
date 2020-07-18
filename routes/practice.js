const express = require('express')
const router = express.Router()
const Word = require('../models/word')
const { paginatedResults } = require('../public/paginateResults')
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated
const checkPracticeSession = require('../public/paginateResults').checkPracticeSession
const practicePaginatedResults = require('../public/paginateResults').practicePaginatedResults

function practiceSessionExists(req) {
    return req.session.query ? true : false
}


router.get('/', checkAuthenticated, (req, res) => {
    if (practiceSessionExists(req)) {
        res.render('practice/practice')
    } else {
        res.redirect('/practice/choose')
    }
})

router.get('/choose', checkAuthenticated, (req, res) => {
    if (practiceSessionExists(req)) {
        res.redirect('/practice')
    } else {
        res.render('practice/choose')
    }
})

router.post('/choose', checkAuthenticated, (req, res) => {
    //test parameters by counting how many words are there.
    //if ok set req.session.practice as follows 
    req.session.query={}
    req.session.query.knowledgeLevel = req.query.knowledgeLevel? req.query.knowledgeLevel.split(',') : null
    req.session.query.labels = req.query.labels ? req.query.labels.split(',') : null
    req.session.lastAccessed = 1
    res.redirect('/practice')
})

router.get('/words', checkAuthenticated, checkPracticeSession, practicePaginatedResults(Word), (req, res) => {
    const response = {
        success: true,
        content: res.paginatedResults,
        error: {}
    }
    res.json(response)
})

router.delete('/', (req, res) => {
    req.session.query = null
    res.redirect('/words')
})

module.exports = router