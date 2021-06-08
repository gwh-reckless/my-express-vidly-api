const router = require('express').Router()
const mongoose = require('mongoose')
const Fawn = require('fawn')

const { Rental } = require('../models/rental')
const { Movie } = require('../models/movie')

// Fawn.init(mongoose)

router.post('/', async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId)
  if (!rental) return res.status(400).send('Rental Not Found')

  if (rental.dateReturn) {
    return res.status(400).send('Return already processed')
  }
  rental.return()
  //   new Fawn.Task()
  //     .save(rental)
  //     .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
  //     .run()
  rental.save()
  await Movie.findByIdAndUpdate(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  )
  res.send(rental)
})

module.exports = router
