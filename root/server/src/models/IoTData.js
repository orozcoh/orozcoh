const mongoose = require('mongoose')

// Schema definition
const IoTDataSchema = new mongoose.Schema({
  device_name: {
    type: String,
    required: true
  },
  time: {
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

// Model definition
const IoTData = mongoose.model('IoTData', IoTDataSchema)

module.exports = IoTData
