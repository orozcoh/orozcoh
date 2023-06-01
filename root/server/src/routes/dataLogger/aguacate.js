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

module.exports = router
