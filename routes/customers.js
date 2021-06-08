const router = require('express').Router()
const { RSA_NO_PADDING } = require('constants')
const { Customer, validate } = require('../models/customer')

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find()
    res.send(customers)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      res.status(400).send('Not Found')
    } else {
      res.send(customer)
    }
  } catch (error) {}
})

router.post('/', async (req, res) => {
  try {
    const { error, value } = validate(req.body)
    if (error) {
      res.status(400).send(error.details[0].message)
    } else {
      const customer = await new Customer(value).save()
      res.send(customer)
    }
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    let customer = await Customer.findById(id)
    if (!customer) {
      res.status(400).send('Not Found')
    } else {
      const { error, value } = validate(req.body)
      if (error) {
        res.status(400).send(error.details[0].message)
      } else {
        cusotmer = await Customer.findByIdAndUpdate(id, value)
        res.send(customer)
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    let customer = await Customer.findById(id)
    if (!customer) {
      res.status(400).send('Not Found')
    } else {
      customer = await Customer.findByIdAndRemove({ _id: id })
      res.send(customer)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
