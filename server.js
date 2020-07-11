if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// I AM TESTING IF IT WORKS

const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser');

const User = require('./models/user')
const initializePassport = require('./passport-config')
initializePassport(passport,
    async email => { return await User.findOne({ email: email }) },
    async id => { return await User.findById(id)}
)


const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const apiRouter = require('./routes/api')
const wordsRouter = require('./routes/words')
const practiceRouter = require('./routes/practice')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(flash())
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json());

const mongoose = require('mongoose')
const word = require('./models/word')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error("Connected to Mongoose"))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/api', apiRouter)
app.use('/words', wordsRouter)
app.use('/practice', practiceRouter)

app.listen(process.env.PORT || 3000)
