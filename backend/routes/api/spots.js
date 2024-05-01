const express = require('express')
const { Spot } = require('../../db/models')
const { SpotImage } = require('../../db/models')
const { Review, User, ReviewImage, Booking } = require('../../db/models')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { restoreUser } = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize')

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required')
        .isNumeric({ min: -90, max: 90 })
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longtitude is required')
        .isNumeric({ min: -180, max: 180 })
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters')
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price is required')
        .isNumeric({ min: 1 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
]

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

router.get('/:spotId/reviews', async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const spotReviews = await Review.findAll({
        where: {
            spotId: parseInt(req.params.spotId)
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    return res.json({ Reviews: spotReviews })
})

// Get all bookings by spot id
router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id

    const spotBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['ownerId']
            }
        ]
    })

    if (!spotBookings || spotBookings.length === 0) return res.status(404).json({ message: "Spot couldn't be found" })

    const userOwnsSpot = spotBookings.some(booking => booking.Spot.ownerId === parseInt(user))

    console.log(userOwnsSpot)

    const formattedRes = spotBookings.map(booking => {
        if (userOwnsSpot) {
            return {
                User: booking.User,
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }
        } else {
            return {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
        }
    })

    return res.json({ Bookings: formattedRes })
})


// Get all spots owned by current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {

    const user = req.user.id

    console.log(user)

    const getUsersSpots = await Spot.findAll({
        where: {
            ownerId: user
        }
    })

    res.json({
        Spots: getUsersSpots
    })
})

// Get spot by id NEED TO FINISH RESPONSE FORMAT TO ADD IMAGES ETC
router.get('/:spotId', async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId)
    const reviewCount = await Review.count({ where: { spotId: req.params.spotId } })
    console.log(reviewCount)

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })


})

// Get all spots
router.get('/', async (req, res) => {

    const spots = await Spot.findAll()

    return res.json({
        Spots: spots
    })
})

router.post('/:spotId/reviews', restoreUser, requireAuth, validateReview, async (req, res) => {
    const user = req.user.id
    const { review, stars } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const checkReview = await Review.findOne({
        where: {
            userId: user
        }
    })

    if (checkReview) return res.status(500).json({ message: 'User already has a review for this spot' })

    const newReview = await Review.create({
        spotId: parseInt(req.params.spotId),
        userId: user,
        review,
        stars
    })

    return res.status(201).json(newReview)

})

// Create image for a spot based on spotId
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id

    const { url, preview } = req.body

    const checkSpotBelongsToUser = await Spot.findByPk(req.params.spotId)

    if (!checkSpotBelongsToUser) return res.status(404).json({ message: "Spot couldn't be found" })

    if (user !== checkSpotBelongsToUser.ownerId) return res.status(403).json({ message: "Forbidden" })


    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview,
    })

    return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
})


// Create a spot
router.post('/', restoreUser, requireAuth, validateSpot, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const user = req.user.id;

    const newSpot = await Spot.create({
        ownerId: user,
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

    return res.status(201).json(newSpot)
})

// Update exisiting spot based on spotId
router.put('/:spotId', restoreUser, requireAuth, validateSpot, async (req, res) => {
    const user = req.user.id

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const editSpot = await Spot.findByPk(req.params.spotId)

    if (!editSpot) return res.status(404).json({ message: "Spot couldn't be found" })

    if (user !== editSpot.ownerId) return res.status(403).json({ message: "Forbidden" })

    const updatedSpot = await editSpot.update({
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

    return res.json(updatedSpot)

})

router.delete('/:spotId', restoreUser, requireAuth, async (req, res) => {

    const user = req.user.id

    const deleteSpot = await Spot.findByPk(req.params.spotId);

    if (!deleteSpot) return res.status(404).json({ message: "Spot couldn't be found" })

    if (user !== deleteSpot.ownerId) return res.status(403).json({ message: "Forbidden" })

    await Spot.destroy({
        where: {
            id: req.params.spotId
        }
    })

    return res.json({ message: "Deleted successfully" })

})

module.exports = router;
