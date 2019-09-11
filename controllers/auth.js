let router = require('express').Router()
let db = require('../models')
require('dotenv').config()
let jwt = require('jsonwebtoken')


router.post('/login', (req, res) => {
    res.send('STUB - POST /auth/login')
})

router.post('/signup', (req, res) => {
    db.User.findOne({ email: req.body.email })
    .then(user => {
        // IF user exists, do NOT let them create a duplicate account
        if (user) {
            return res.status(409).send({ message: 'Email address already in use' })
        }
        //Good - user doesn't exist yet
        db.User.create(req.body)
        .then(newUser => {
            // user created, let's assign them a token
            let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 //(in seconds)
            })
            res.send({ token })
        })
        .catch(err => {
            console.log('Error while creting new user', err)
            res.status(500).send({ message: 'Error creating new user' })
        })
    })
    .catch(err => {
        console.log('Error in POST /auth/signup', err)
        res.status(503).send({ message: 'Oops, something on our side is off. Or you made a typo. Good Luck.'})
    })
})


// NOTE: User should be logged in to process this route
router .get('/current/user', (req, res) => {
    res.send('STUB - Current User Data')
})

module.exports = router