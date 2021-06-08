const express = require('express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const app = express()
const genre_routes = require('./routes/genres')
const customer_routes = require('./routes/customers')
const movie_routes = require('./routes/movies')
const rental_routes = require('./routes/rentals')
const return_routes = require('./routes/return')
const user_routes = require('./routes/users')
const auth_routes = require('./routes/auth')

const mongoose = require('mongoose')

mongoose
  .connect('mongodb://admin:admin@127.0.0.1/test?authSource=admin')
  .then(() => {
    console.log('Connect to MongoDB')
  })
  .catch((err) => {
    console.error('Could not connect to mongodb')
  })

app.use(express.json())
app.use('/api/genres', genre_routes)
app.use('/api/customers', customer_routes)
app.use('/api/movies', movie_routes)
app.use('/api/rentals', rental_routes)
app.use('/api/return', return_routes)
app.use('/api/users', user_routes)
app.use('/api/auth', auth_routes)

app.listen(3000, () => {
  console.log('App listening on http://127.0.0.1:3000/')
})

exports.Joi = Joi
