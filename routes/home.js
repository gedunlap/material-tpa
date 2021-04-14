const router = require("express").Router()


router.get("/", (req, res) => {
    res.render("home")
})

router.get("/about", (req, res) => {
    res.render("about")
})

router.get("/location", (req, res) => {
    res.render("location")
})

module.exports = router