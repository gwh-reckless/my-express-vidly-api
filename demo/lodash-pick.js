const _ = require('lodash')

var model = {
  fname: null,
  lname: null,
  test: null,
}

var credentials = {
  fname: 'xyz',
  lname: 'abc',
  age: 23,
}

var result = _.pick(credentials, _.keys(model))

console.log(result)
