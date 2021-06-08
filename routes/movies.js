const router = require('express').Router()
const { Movie, validate, movieSchema } = require('../models/movie')
const { Genre } = require('../models/genre')
const _ = require('lodash')
const moment = require('moment')
const { find } = require('lodash')
const { RSA_NO_PADDING } = require('constants')

router.get('/', async (req, res) => {
  const movies = await Movie.find()
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  res.send(movie)
})

router.post('/', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    const genre = await Genre.findById(value.genreId)
    if (!genre) {
      res.status(400).send('Genre Not Found')
    } else {
      // const movie = new Movie({})
      value.genre = {
        _id: genre._id,
        name: genre.name,
      }
      value.publishDate = moment().toJSON()
      let movie = new Movie(_.pick(value, _.keys(movieSchema.obj)))
      movie = await movie.save()
      res.send(movie)
    }
  }
})

router.put('/:id', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    const genre = await Genre.findById(value.genreId)
    if (!genre) {
      res.status(400).send('Genre Not Found')
    } else {
      let movie = (await Movie.findById(req.params.id))._doc
      movie = _.assign({}, movie, value)
      console.log(movie)
      movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, movie)
      res.send(movie)
    }
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  let movie = await Movie.findById({ _id: id })

  if (!movie) {
    res.status(400).send('Movie not Found')
  } else {
    movie = await Movie.findByIdAndRemove({ _id: id })
    res.send(movie)
  }
})

module.exports = router
