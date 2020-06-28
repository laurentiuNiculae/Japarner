const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const label = require('../models/label')
const checkNotAuthenticated = require('../public/checkAuthenticated').checkNotAuthenticated

router.get('/', checkNotAuthenticated ,(req, res) => {
    res.render('register/register', { message: "" })
})

router.post('/', checkNotAuthenticated ,async (req, res) => {
    try {
        const exists = await User.findOne({ email: req.body.email })
        if (exists) {
            res.render('register/register', { message: 'Email Exists!' })
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                hashedPassword: await bcrypt.hash(req.body.password, 10)
            })
            const response = await user.save()
            res.redirect(302, '/login')
        }
    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
})

module.exports = router