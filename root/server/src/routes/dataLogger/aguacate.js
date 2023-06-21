//Get network interfaces and IPs
//const { networkInterfaces } = require('os')
//const nets = networkInterfaces()
//console.log('Connected IP:', nets['en0'][1]['address'])

const express = require('express')
const { format } = require('date-fns')
const aguacateData = require('../../models/aguacateData')
const process = require('process')
require('dotenv').config()

const keys = process.env.DEVICES_API_KEYS.split('\n')

const router = express.Router()

/**
 * ---------------------------------- "/" --------------------------------------
 *  - GET: last item posted
 *  - POST: new item
 * -----------------------------------------------------------------------------
 */
router
  .route('/')
  .get((req, res) => {
    aguacateData
      .getLastItem()
      .then((lastData) => res.send(lastData))
      .catch((error) => res.status(500).send(error))
  })
  .post(validateDeviceApiKey, (req, res) => {
    if (req.isDeviceKeyValid) {
      const newData = new aguacateData(req.body['data'])
      newData
        .postItem()
        .then((savedItem) => {
          res.send(`Item posted: ${savedItem}`)
        })
        .catch((error) => {
          res.status(500).send(error)
        })
    } else {
      res.status(403).send(`You don't have permission to access this resource`)
    }
  })

/**
 * --------------------------------- "/data" -----------------------------------
 *
 *  - GET: Array of items within the range of {startTime} and {endTime} params
 * -----------------------------------------------------------------------------
 */
router
  .route('/data')

  .get((req, res) => {
    const startTime = parseInt(req.query.startTime)
    const endTime = parseInt(req.query.endTime)
    aguacateData
      .getRangeOfItems(startTime, endTime)
      .then((items) =>
        items.length > 0
          ? res.send(items)
          : res.status(404).send('There is no data between the dates provided')
      )
      .catch(() => res.status(500).send('Error while finding data'))
  })

/**
 * ---------------------------- "/data/latest-timestamp" ------------------------
 *
 *  - GET: String with the date of last item posted formated to "DD/MM/YY HH:mm"
 * -----------------------------------------------------------------------------
 */
router
  .route('/data/latest-timestamp')

  .get((req, res) => {
    aguacateData
      .getLastItem()
      .then((lastItem) => {
        const date = new Date(lastItem['unix_time'] * 1000)
        const formattedDate = format(date, 'MMM dd, yyyy - HH:mm:ss')
        res.send({ date: formattedDate })
      })
      .catch(() => res.status(500).send('Error while getting the last item'))
  })

/**
 * --------------------------- "/data/last/:nhours/hours" -----------------------
 *
 *  - GET: Array of items of the last {nhours}
 *  - limit {nhours} to 48 hours
 * ------------------------------------------------------------------------------
 */
router
  .route('/data/last/:nhours/hours')

  .get(async (req, res) => {
    const nhours = req.nhours < 48 ? req.nhours : 1
    const nhours_unix_time = nhours * 3600

    const lastItem = await aguacateData
      .getLastItem()
      .catch(() => console.log('Error while getting the last item'))

    const startTime = lastItem['unix_time'] - nhours_unix_time
    const endTime = lastItem['unix_time']

    aguacateData
      .getRangeOfItems(startTime, endTime)
      .then((items) =>
        items.length > 0
          ? res.send(items)
          : res.status(404).send(`There is no data in the last ${nhours} hours`)
      )
      .catch(() => res.status(500).send('Error while finding data'))
  })

/**
 * --------------------------- "/data/last/:ndays/days" -----------------------
 *
 *  - GET: Array of items of the last {nhours}
 *  - limit {nhours} to 48 hours
 * ----------------------------------------------------------------------------
 */
router
  .route('/data/last/:ndays/days')

  .get(async (req, res) => {
    const ndays = req.ndays <= 31 ? req.ndays : 1
    const ndays_unix_time = ndays * 3600 * 24

    const lastItem = await aguacateData
      .getLastItem()
      .catch(() => console.log('Error while getting the last item'))

    const startTime = lastItem['unix_time'] - ndays_unix_time
    const endTime = lastItem['unix_time']

    aguacateData
      .getRangeOfItems(startTime, endTime)
      .then((items) =>
        items.length > 0
          ? res.send(items)
          : res.status(404).send(`There is no data in the last ${ndays} days`)
      )
      .catch(() => res.status(500).send('Error while finding data'))
  })

/**
 * ---------------------------- "/data/:timestamp" -----------------------------
 *
 *  - GET: {timestamp} item -> should get closest item round to lower
 *  - DELETE: {timestamp} item -> needs exact timestamp
 *  - PUT: Update {timestamp} item -> needs exact timestamp
 * -----------------------------------------------------------------------------
 */
router
  .route('/data/:timestamp')

  .get((req, res) => {
    aguacateData
      .getOneItem(req.timestamp)
      .then((item) => (item ? res.send(item) : res.send('Item not found')))
      .catch(() => res.status(500).send('Error finding item'))
  })

  .put((req, res) => {
    aguacateData
      .updateOneItem(req.timestamp, req.body)
      .then((item) =>
        item
          ? res.send(`Item updated: ${item}`)
          : res.status(404).send('Item not found to update')
      )
      .catch(() => res.status(500).send('Error while updating item'))
  })

  .delete((req, res) => {
    aguacateData
      .deleteItem(req.timestamp)
      .then((delData) => res.send(`Deleted data was:\n\n${delData}`))
      .catch((error) => {
        res.status(500).send(`Error deleting item: ${error}`)
      })
  })

//-------------------------------------------------------------------------------
//---------------------- Middleware and parameters setting ----------------------
//-------------------------------------------------------------------------------

router.param('timestamp', (req, res, next) => {
  const time = parseInt(req.params.timestamp)
  req.timestamp = time
  next()
})

router.param('nhours', (req, res, next) => {
  const nhours = parseInt(req.params.nhours)
  req.nhours = nhours
  next()
})

router.param('ndays', (req, res, next) => {
  const ndays = parseInt(req.params.ndays)
  req.ndays = ndays
  next()
})

function validateDeviceApiKey(req, res, next) {
  const api_key = req.body['api_key']
  let isDeviceKeyValid = false
  if (keys.includes(api_key)) {
    isDeviceKeyValid = true
  }
  req.isDeviceKeyValid = isDeviceKeyValid
  next()
}

//-------------------------------------------------------------------------------

module.exports = router
