const router = require('express').Router()
const { User, validate } = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const { email } = value
  let user = await User.findOne({ email: email })
  if (user) return res.status(400).send('Email already  been registered')
  user = new User(value)

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  user = await user.save()
  const token = user.generateAuthToken()

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})

module.exports = router
