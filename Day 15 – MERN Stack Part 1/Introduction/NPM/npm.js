// npm - global command, comes with code
//npm --version

// local dependency - use it only in this particular project
// npm i <packageName>

// global dependency - use it in any project
// npm install -g <packageName>

// package.json - manifest file 
// manula approach
// npm init
// npm init -y (default)

const _ = require('lodash');

const items = [1, [2, [3, [4]]]]
const newItems = _.flatMapDeep(items)
console.log(newItems);
console.log('Hello World');