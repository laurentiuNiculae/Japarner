const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../public/checkAuthenticated').checkAuthenticated

const Label = require('../models/label')

router.get('/', checkAuthenticated , async (req, res) => { //
    let response = {}
    try {
        response.content = await Label.find({ownerId: req.user._id.toString()})
        response.success = true
        response.error = {}
    } catch (error) {
        response.error = error
        response.content = {}
        response.success = true
    }

    res.json(response)
})

router.post('/', checkAuthenticated, async (req,res) =>{
    let response = {}
    let label = new Label({
        ownerId: req.user._id.toString(),
        content: req.body.content,
        phoneticReading: req.body.phoneticReading,
        meanings: req.body.meanings,
        example: req.body.example
    })
    try {
        await label.save()
        response.success = true
        response.content = {}
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