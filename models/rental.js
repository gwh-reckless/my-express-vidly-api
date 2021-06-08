const Joi = require('joi')
const mongoose = require('mongoose')
const moment = require('moment')
const _ = require('lodash')
const { genreSchema } = require('./genre')
const { movieSchema } = require('./movie')

const customer_keys = ['_id', 'name', 'phone']
const movie_keys = ['_id', 'title', 'dailyRentalRate']

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema(_.pick(genreSchema.obj, customer_keys)),
    required: true,
  },
  movie: {
    type: new mongoose.Schema(_.pick(movieSchema.obj, movie_keys)),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateReturn: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
})

/***
 * What is this?
 */
rentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    'customer._id': customerId,
    'movie._id': movieId,
    dateReturn: null,
  })
}

rentalSchema.methods.return = function () {
  this.dateReturn = new Date()
  const rentalDays = moment().diff(this.dateOut, 'days')
  this.rentalFee = rentalDays * this.movie.dailyRentalRate
}

const Rental = new mongoose.model('Rental', rentalSchema)

function validate(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  })
  return schema.validate(rental)
}

exports.validate = validate
exports.Rental = Rental
exports.rentalSchema = rentalSchema
