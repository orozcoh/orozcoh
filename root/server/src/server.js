const process = require('process')
const cors = require('cors')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.pluralize(null)

const dataLoggerRouter = require('./routes/dataLogger')
const rootRouter = require('./routes/root')

console.log('Running server...')

// Connect to MongoDB cluster
mongoose
  .connect(process.env.DB_HOST, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Connection error:', error)
  })

const app = express()

/* const corsOptions = {
  origin: 'https://example.com' // Replace with your desired domain
}; */

//app.use(cors(corsOptions));

app.use(cors())
app.use(express.json())
app.use('/', rootRouter)
app.use('/dataLogger', dataLoggerRouter)

app.listen(3000)
