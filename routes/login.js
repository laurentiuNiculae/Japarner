const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkNotAuthentificated = require('../public/checkAuthentificated').checkNotAuthentificated


router.get('/', checkNotAuthentificated ,(req, res) => {
    res.render('login/login')
})

router.post('/', checkNotAuthentificated ,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router