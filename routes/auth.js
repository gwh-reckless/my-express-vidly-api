const Joi = require('joi')
const { User } = require('../models/user')
const router = require('express').Router()
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const user = await User.findOne({ email: value.email })
  if (!user) return res.status(400).send('User not found')

  const validatePassword = await bcrypt.compare(value.password, user.password)
  if (!validatePassword)
    return res.status(400).send('Invalid email or password')

  const token = user.generateAuthToken()
  res.send(token)
})

function validate(data) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  })

  return schema.validate(data)
}

module.exports = router
