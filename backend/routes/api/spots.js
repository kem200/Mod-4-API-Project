const express = require('express')
const { Spot } = require('../../db/models')
const router = express.Router()

router.get('/', async (req, res) => {

    const spots = Spot.findAll()

    return res.json(spots)
})

module.exports = router;