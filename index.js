const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

const dbConfig = require("./knexfile"); 
const db = knex(dbConfig.development); 

server.use(express.json());
server.use(helmet());


// endpoints here
server.get("/", (req, res)=>{
  res.send("API Running..."); 
})



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
