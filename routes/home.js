///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()

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
  
  router.post('/auth/signup', (req, res) => {
    res.send('signup post')
  })

  // Login
  router.get('/auth/login', (req, res) => {
    res.send('login get')
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