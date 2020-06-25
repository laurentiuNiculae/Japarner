if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')


const User = require('./models/user')
const initializePassport = require('./passport-config')
initializePassport(passport,
    async email => { return await User.findOne({ email: email }) },
    async id => { return await User.findById(id)}
)


const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))  //params are set in body
app.use(flash())
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error("Connected to Mongoose"))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.listen(process.env.PORT || 3000)
