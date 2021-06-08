const express = require('express')
const router = express.Router()
const { Genre, validate } = require('../models/genre')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const genres = await Genre.find()
    res.send(genres)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const genre = await Genre.findOne({ _id: id })
    if (!genre) {
      res.status(400).send('Not Found')
    }
    res.send(genre)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  try {
    let genre = await Genre.findOne({ _id: id })
    if (!genre) {
      res.status(400).send('Not Found')
    }
    const { error, value } = validate(req.body)
    if (error) {
      res.status(400).send(error.details[0].message)
    } else {
      // this reutrn the old genre
      genre = await Genre.findByIdAndUpdate(id, value)
      res.send(genre)
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].messsage)
  } else {
    let genre = new Genre(value)
    genre = await genre.save()
    res.send(genre)
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const genre = await Genre.findByIdAndRemove(id)
  res.send(genre)
})

module.exports = router
