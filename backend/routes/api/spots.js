const express = require('express')
const { Spot } = require('../../db/models')
const router = express.Router()

router.get('/', async (req, res) => {

    const spots = Spot.findAll()

    return res.json(spots)
})

router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = Spot.build({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
})

module.exports = router;
