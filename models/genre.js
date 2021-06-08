const mongoose = require('mongoose')
const joi = require('joi')

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
})

const Genre = new mongoose.model('Genre', genreSchema)

function validate(data) {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
  })
  const result = schema.validate(data)
  return result
}

exports.Genre = Genre
exports.genreSchema = genreSchema
exports.validate = validate
