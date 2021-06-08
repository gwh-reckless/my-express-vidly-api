const config = require('config')

const name = config.get('name')
console.log(name)

const age = config.get('age')
console.log(age)
