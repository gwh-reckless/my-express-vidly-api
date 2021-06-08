const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
})

const Customer = new mongoose.model('customers', customerSchema)

function validate(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  })
  return schema.validate(customer)
}

exports.customerSchema = customerSchema
exports.Customer = Customer
exports.validate = validate
