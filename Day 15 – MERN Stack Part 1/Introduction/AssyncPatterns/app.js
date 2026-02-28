const http = require('http')

const server = http.createServer((req,res) =>{
  if(req.url === '/'){
    res.end("Welcome to our home page");
  }
  if(req.url === '/about'){
    // Blocking code !!!
    for(let i = 0; i< 1000;i++){
      for(let j = 0; j< 1000; j++){
        console.log(`${i} ${j}`)
      }
    }
    res.end("Welcome to our about page");
  }
  res.end(`
    <h1>Opps!</h1>
    <p>There is something went wrong!</p>`)
})

server.listen(5000, () =>{
  console.log('Server is listening on port : 5000....')
})