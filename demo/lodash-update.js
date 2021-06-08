const _ = require('lodash')

var foo = { a: 0, b: 1 }
var bar = { b: 2, c: 3 }
// #This could also be written slightly more concisely using lodash.

// _.assign prefers the values in bar

_.assign({}, foo, _.pick(bar, _.keys(foo)))
// {a: 0, b: 2}

// _.defaults prefers the values in foo
_.defaults({}, foo, _.pick(bar, _.keys(foo)))

// {a: 0, b: 1}
