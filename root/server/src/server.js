const express = require('express')
const aguacateRouter = require('./routes/dataLogger/aguacate')
const rootRouter = require('./routes/root')

const app = express()

app.use(express.json())
app.use('/', rootRouter)
app.use('/dataLogger/aguacate', aguacateRouter)

app.listen(3000)
