const express = require('express')
const router = express.Router()
const checkAuthentificated = require('../public/checkAuthentificated').checkAuthentificated


router.get('/', checkAuthentificated ,(req, res) => {
    res.json(req.user)
})

router.post('/', checkAuthentificated, (req,res) =>{

})

module.exports = router