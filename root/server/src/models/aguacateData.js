const mongoose = require('mongoose')

const TIME_INTERVAL = 5 * 60 // Number of seconds in 5 min

// Schema definition
const aguacateDataSchema = new mongoose.Schema({
  device_name: {
    type: String,
    required: true
  },
  unix_time: {
    type: Number,
    required: true,
    unique: true
  },
  light: {
    type: Number,
    required: true
  },
  temp: {
    type: Number,
    required: true
  },
  soil_humidity: {
    type: Number,
    required: true
  },
  air_humidity: {
    type: Number,
    required: true
  }
})

aguacateDataSchema.methods.postItem = async function () {
  try {
    const newItem = await this.save()
    return newItem
  } catch (err) {
    //console.log('error:', err)
    const error = `Failed to post item - Error code: ${err.code}\n${
      err.code === 11000 &&
      `Duplicate key error collection: ${JSON.stringify(err.keyValue)}`
    }`
    throw error
  }
}

aguacateDataSchema.statics.getLastItem = async function () {
  try {
    const newItem = await this.findOne().sort({ _id: -1 }).exec()
    return newItem
  } catch (err) {
    throw 'Could not find item'
  }
}

aguacateDataSchema.statics.getOneItem = async function (timestamp) {
  try {
    const theItem = await this.findOne({
      unix_time: {
        $gte: timestamp - TIME_INTERVAL / 2,
        $lt: timestamp + TIME_INTERVAL / 2
      }
    }).exec()
    return theItem
  } catch (err) {
    throw 'Could not find item'
  }
}

aguacateDataSchema.statics.getRangeOfItems = async function (
  startTime,
  endTime
) {
  try {
    const itemArray = await this.find({
      unix_time: {
        $gte: startTime,
        $lt: endTime + 1
      }
    }).exec()
    return itemArray
  } catch (err) {
    throw 'Could not find item'
  }
}

aguacateDataSchema.statics.updateOneItem = async function (
  timestamp,
  updateData
) {
  try {
    const theItem = await this.findOneAndUpdate(
      { unix_time: timestamp },
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).exec()
    return theItem
  } catch (err) {
    throw 'Could not find item'
  }
}

aguacateDataSchema.statics.deleteItem = async function (timestamp) {
  try {
    const deletedItem = await this.findOneAndDelete({
      unix_time: timestamp
    }).exec()
    return deletedItem
  } catch (error) {
    throw 'Could not find item'
  }
}

// Model definition
const aguacateData = mongoose.model('aguacateData', aguacateDataSchema)

module.exports = aguacateData
