const express = require('express')
const router = express.Router()
const checkAuthentificated = require('../public/checkAuthentificated').checkAuthentificated

const Lable = require('../models/lable')

router.get('/', checkAuthentificated , async (req, res) => { //
    let response = {}
    try {
        response.content = await Lable.find({ownerId: req.user._id.toString()})
        response.success = true
        response.error = {}
    } catch (error) {
        response.error = error
        response.content = {}
        response.success = true
    }

    res.json(response)
})

router.post('/', checkAuthentificated, (req,res) =>{
    let response = {}
    let lable = new Lable({
        ownerId: req.user._id.toString(),
        content: req.body.content,
        phoneticReading: req.body.phoneticReading,
        meanings: req.body.meanings,
        example: req.body.example
    })
    try {
        await lable.save()
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