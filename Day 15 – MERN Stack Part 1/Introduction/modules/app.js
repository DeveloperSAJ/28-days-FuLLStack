// CommmonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./names');
const sayHi  = require('./utills');
const data = require('./alternative')
require('./math-functions')
console.log(data);

sayHi('susan');
sayHi(names.john);
sayHi(names.alam);