const mongoose = require('mongoose')

//const TIME_INTERVAL = 5 * 60 // Number of seconds in 5 min

// Schema definition
const dataLoggerDataSchema = new mongoose.Schema({
  device_name: {
    type: String,
    required: true
  },
  unix_time: {
    type: Number,
    required: true
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

dataLoggerDataSchema.methods.postItem = async function () {
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

dataLoggerDataSchema.statics.getLastItem = async function (deviceName) {
  try {
    const newItem = await this.findOne({ device_name: deviceName }).sort({
      _id: -1
    })
    return newItem
  } catch (err) {
    throw 'Could not find item'
  }
}

dataLoggerDataSchema.statics.getOneItem = async function (
  deviceName,
  timestamp
) {
  try {
    const theItem = await this.findOne({
      device_name: deviceName,
      unix_time: timestamp
    }).exec()
    return theItem
  } catch (err) {
    throw 'Could not find item'
  }
}

dataLoggerDataSchema.statics.getRangeOfItems = async function (
  deviceName,
  startTime,
  endTime
) {
  try {
    const itemArray = await this.find({
      device_name: deviceName,
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

dataLoggerDataSchema.statics.updateOneItem = async function (
  deviceName,
  timestamp,
  updateData
) {
  try {
    const theItem = await this.findOneAndUpdate(
      { device_name: deviceName, unix_time: timestamp },
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

dataLoggerDataSchema.statics.deleteItem = async function (
  deviceName,
  timestamp
) {
  try {
    const deletedItem = await this.findOneAndDelete({
      device_name: deviceName,
      unix_time: timestamp
    }).exec()
    return deletedItem
  } catch (error) {
    throw 'Could not find item'
  }
}

dataLoggerDataSchema.statics.deleteItems = async function (
  deviceName,
  unix_start,
  unix_end
) {
  try {
    const itemArray = await this.deleteMany({
      device_name: deviceName,
      unix_time: {
        $gte: unix_start,
        $lt: unix_end + 1
      }
    }).exec()
    return itemArray
  } catch (err) {
    throw 'Could not find items to delete'
  }
}

// Model definition
const dataLoggerData = mongoose.model('IoT', dataLoggerDataSchema)

module.exports = dataLoggerData
