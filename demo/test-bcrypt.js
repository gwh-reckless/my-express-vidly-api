const bcrypt = require('bcrypt')

const salt = bcrypt.genSaltSync()
console.log(salt)

const hashed_password = bcrypt.hashSync('admin', salt)
console.log(hashed_password)
