///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require('bcrypt')
const Client = require('../models/User')

///////////////////////////////
// Router Specific Middleware
////////////////////////////////

///////////////////////////////
// Router Routes
////////////////////////////////

router.get("/", (req, res) => {
    res.render("home")
})

// Signup
router.get('/auth/signup', (req, res) => {
    res.render('auth/signup')
  })
  
router.post('/auth/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10); //make the salt
        req.body.password = await bcrypt.hash(req.body.password, salt); //use the salt on the user password
        await Client.create(req.body) //make the user account
        res.redirect('/auth/login') //go to login page
    } catch (error) {
        res.json(error)
    }
})

// Login
router.get('/auth/login', (req, res) => {
    res.render('auth/login')
})

router.post('/auth/login', (req, res) => {
    res.send('login post')
})

// Logout 
router.get('/auth/logout', (req, res) => {
    res.send('logout get')
})
  
///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router