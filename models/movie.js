const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema } = require('./genre')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  publishDate: {
    type: String,
  },
})

const Movie = new mongoose.model('Movie', movieSchema)

function validate(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(5).max(255).required(),
    dailyRentalRate: Joi.number().min(5).max(255).required(),
    publishDate: Joi.string(),
  })
  return schema.validate(movie)
}

exports.Movie = Movie
exports.movieSchema = movieSchema
exports.validate = validate
