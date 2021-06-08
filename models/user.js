const { string, boolean } = require('joi')
const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

//  name, email, password, isAdmin
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  isAdmin: Boolean,
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      admin: this.isAdmin,
    },
    config.get('jwtPrivateKey')
  )
  return token
}

const User = new mongoose.model('User', userSchema)

function validate(User) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(2).max(255).required(),
    isAdmin: Joi.boolean(),
  })

  return schema.validate(User)
}

exports.userSchema = userSchema
exports.User = User
exports.validate = validate
