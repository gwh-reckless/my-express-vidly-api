const router = require('express').Router()
const mongoose = require('mongoose')
const { Rental, validate } = require('../models/rental')
const { Customer } = require('../models/customer')
const { Movie } = require('../models/movie')

const Fawn = require('fawn')

Fawn.init(mongoose)

router.get('/', async (req, res) => {
  const rentals = await Rental.find()
  res.send(rentals)
})

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id)
  if (!rental) {
    res.status(400).send('Rental Not Found')
  } else {
    res.send(rental)
  }
})

router.post('/', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    const customer = await Customer.findById({ _id: value.customerId })
    const movie = await Movie.findById({ _id: value.movieId })

    if (movie.numberInStock === 0)
      return res.status(400).send('Movie not in stock.')

    let rental = new Rental(value)
    rental.customer = customer
    rental.movie = movie

    if (!rental.customer || !rental.movie) {
      res.status(400).send('Customer or Movie not Found')
    } else {
      try {
        new Fawn.Task()
          .save('rentals', rental)
          .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
          .run()
        res.send(rental)
      } catch (ex) {
        console.log(ex)
        res.status(500).send('Something Failed')
      }
    }
  }
})
/**
 * Only for dev
 */
router.delete('/all', async (req, res) => {
  const rentals = await Rental.deleteMany({})
  res.send(rentals)
})

module.exports = router
