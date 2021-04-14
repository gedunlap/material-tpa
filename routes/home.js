///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require('bcrypt')
const Client = require('../models/Client')

///////////////////////////////
// Router Specific Middleware
////////////////////////////////



// checks login by looking for userId in sessions to creat req.user
const addClientToRequest = async (req, res, next) => {
    if (req.session.userId) {
        req.user = await Client.findById(req.session.userId)
        next()
    } else {
        next()
    }
}

// check if user is authorized to access route
const isAuthorized = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/auth/login')
    }
}

router.use(addClientToRequest)

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
        if (client) { //if account exists
            const checkpassword = await bcrypt.compare(req.body.password, client.password) //check if password matches
            if (checkpassword) { //if password matches
                req.session.userId = client._id //create logged in session id
                res.redirect('/appointments') //redirect home
            } else {
                res.json({error: 'INCORRECT PASSWORD'})
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


// Index
// Render Appointments if Authorized
router.get('/appointments', isAuthorized, async (req, res) => {
    const user = await Client.findOne({username: req.user.username})
    res.render('appointments', {apmts: user.apmts})
})

// New
router.get('/new', isAuthorized, async (req, res) => {
    const user = await Client.findOne({username: req.user.username})
    res.render('new')
})


// Destroy
router.delete('/appointments/:id', isAuthorized, async (req, res) => {
    const user = await Client.findOne({username: req.user.username})
    const id = req.params.id
    const index = req.user.apmts.findIndex((apmt) => `${apmt._id}` === id)
    req.user.apmts.splice(index, 1)
    req.user.save()
    res.redirect('/appointments')
})

// Update
router.put('/appointments/:id', isAuthorized, async (req, res) => {
    const user = await Client.findOne({username: req.user.username})
    const id = req.params.id
    const index = req.user.apmts.findIndex((apmt) => `${apmt._id}` === id)
    req.user.apmts[index] = req.body
    req.user.save()
    res.redirect('/appointments')
})

// Create
router.post('/appointments', isAuthorized, async (req, res) => {
    const user = await Client.findOne({username: req.user.username})
    user.apmts.push(req.body)
    await user.save()
    res.redirect('/appointments')
})

// Edit
router.get('/appointments/:id/edit', isAuthorized, async (req, res) => {
    const user = await Client.findOne({username: req.user.username})
    const id = req.params.id
    const index = req.user.apmts.findIndex((apmt) => `${apmt._id}` === id)
    const apmt = req.user.apmts[index]
    res.render('edit', {apmt})
})

// Show
router.get('/appointments/:id', isAuthorized, async (req, res) => {
    const user = await Client.findOne({username: req.user.username})
    const id = req.params.id
    const index = req.user.apmts.findIndex((apmt) => `${apmt._id}` === id)
    const apmt = req.user.apmts[index]
    res.render('show', {apmt})
})




///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router