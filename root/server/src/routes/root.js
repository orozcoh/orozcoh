const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  try {
    res.status(200).send('Welcome to root path')
  } catch {
    res.status(500).json({ message: 'Error' })
  }

  // res.download("server.js")
  // ------  rendering html/ejs  --------
  // npm i ejs
  // app.set("view engine", "ejs")
  // res.render("./views/index")
})

module.exports = router
