const express = require('express')

const router = express.Router()

let data = [
  {
    device: 'esp32',
    time: 123,
    light: 12,
    temp: 50,
    air_humidity: 90,
    soil_humidity: 80
  }
]

/**
 * ---------------------------------- "/"" -------------------------------------
 *  - GET: last item posted
 *  - POST: new item
 */
router
  .route('/')
  .get((req, res) => {
    res.send(JSON.stringify(data))
  })
  .post((req, res) => {
    try {
      data.push(req.body)
      res.send(data[data.length - 1])
    } catch {
      res.status(500).send('something went wrong')
    }
  })

/**
 * --------------------------------- "/data" -----------------------------------
 *
 *  - GET: Array of items within the range of {startTime} and {endTime} params
 */
router.route('/data').get((req, res) => {
  const startTime = req.query.startTime
  const endTime = req.query.endTime
  if (startTime && endTime) {
    res.send(`Getting data from: ${startTime} until ${endTime}`)
  } else {
    res.status(404).send('Item not found')
  }
})

/**
 * ---------------------------- "/data/:timestamp" -----------------------------
 *
 *  - GET: {timestamp} item -> should get closest item round to lower
 *  - DELETE: {timestamp} item -> needs exact timestamp
 *  - PUT: Update {timestamp} item -> needs exact timestamp
 */
router
  .route('/data/:timestamp')
  .get(validateMiddleware, (req, res) => {
    if (req.validTime) {
      res.send(
        `Getting data from: ${req.params.timestamp} is:\n\n${JSON.stringify(
          req.validTime
        )}`
      )
    } else {
      res.status(404).send('Item not found')
    }
  })
  .put((req, res) => {
    if (req.validTime) {
      res.send(
        `Updating data from: ${req.params.timestamp} is:\n\n${JSON.stringify(
          req.validTime
        )}`
      )
    } else {
      res.status(404).send('Item not found')
    }
  })
  .delete((req, res) => {
    if (req.validTime) {
      res.send(
        `Deleting data from: ${req.params.timestamp} is:\n\n${JSON.stringify(
          req.validTime
        )}`
      )
    } else {
      res.status(404).send('Item not found')
    }
  })

//---------------------- Middleware and parameters setting ----------------------

router.param('timestamp', (req, res, next) => {
  console.log('validating timestamp....')
  const time = parseInt(req.params.timestamp)
  const resData = data.find((item) => item.time === time)
  req.validTime = resData
  next()
})

function validateMiddleware(req, res, next) {
  console.log('Getting data by timestamp')
  next()
}

//-------------------------------------------------------------------------------

module.exports = router
