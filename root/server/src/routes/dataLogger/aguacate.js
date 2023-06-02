const express = require('express')
const aguacateData = require('../../models/aguacateData')

const router = express.Router()

/**
 * ---------------------------------- "/"" -------------------------------------
 *  - GET: last item posted
 *  - POST: new item
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
          : res.status(404).send('There is not data between the dates provided')
      )
      .catch(() => res.status(500).send('Error while finding data'))
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

//---------------------- Middleware and parameters setting ----------------------

router.param('timestamp', (req, res, next) => {
  const time = parseInt(req.params.timestamp)
  req.timestamp = time
  next()
})

/* function validateMiddleware(req, res, next) {
  console.log('Getting data by timestamp')
  next()
} */

//-------------------------------------------------------------------------------

module.exports = router
