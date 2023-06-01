const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("getting data")
})

module.exports = router