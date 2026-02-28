const http = require('http')

//started operating system process
console.log('first')
setTimeout(() => {
  console.log('second')
},0)
console.log('third')
// completed and exited operating operatung system process


setInterval(() =>{
  console.log('hello world')
}, 2000)

console.log('I will run first')

const server = http.createServer((req,res) =>{
  console.log('request event')
  res.end("hello world")
})

server.listen(5000, ()=> {
  console.log("Server is listening on port : 5000.....")
})