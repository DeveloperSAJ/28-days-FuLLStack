// const EventEmitter = require('events');

// const customEmmitter = new EventEmitter();

// customEmmitter.on('response',(name, id) =>{
//   console.log(`data received user ${name} with id: ${id}`)
// });

// customEmmitter.emit('response')

// customEmmitter.on('response',() =>{
//   console.log('some other logic here')
// });


const http = require('http')


const server = http.createServer()

server.on('request', (req,res) =>{
  res.end('Welcome')
})

server.listen(5000)