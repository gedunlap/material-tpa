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
        req.body.password = await bcrypt.hash(req.body.password, salt); //hashbrown, use the salt on the user password
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

router.post('/auth/login', async (req, res) => {
    try {
        const client = await Client.findOne({username: req.body.username}) //check if client account exists
        if (user) { //if account exists
            const checkpassword = await bcrypt.compare(req.body.password, user.password) //check if password matches
            if (checkpassword) { //if password matches
                req.session.userId = user._id //create logged in session id
                res.redirect('/appointments') //redirect home
            } else {
                res.json({error: 'PASSWORD DOES NOT MATCH'})
            }
        } else {
            res.json({error: "CLIENT ACCOUNT DOES NOT EXIST"})
        }
    } catch (error) {
        res.json(error)
    }
})

// Logout 
router.get('/auth/logout', (req, res) => {
    req.session.userId = null
    res.redirect('/')
})
  
///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router