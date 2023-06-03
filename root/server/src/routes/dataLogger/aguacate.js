const express = require('express')
const aguacateData = require('../../models/aguacateData')

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
  .post((req, res) => {
    const newData = new aguacateData(req.body)
    newData
      .postItem()
      .then((savedItem) => {
        res.send(`Item posted: ${savedItem}`)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
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

    console.log('nhours:', nhours)
    console.log('between: ', startTime, ' and: ', endTime, ' hours')
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

    console.log('ndays:', ndays)
    console.log('between: ', startTime, ' and: ', endTime, ' hours')
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
  req.nhours = ndays
  next()
})

/* function validateMiddleware(req, res, next) {
  console.log('Getting data by timestamp')
  next()
} */

//-------------------------------------------------------------------------------

module.exports = router
