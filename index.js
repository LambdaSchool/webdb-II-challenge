const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
// TEST
server.get('/', (req, res) => {
  res.json({api: 'up'});
});

// POST
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res
        .status(500)
        .json({message: 'There was an error adding the zoo.', error});
    });
});

// GET
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res
        .status(500)
        .json({message: 'There was an error getting the zoos.', error});
    });
});

// GET ID
server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id;

  db('zoos')
    .where({id})
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(error => {
      res.status.json({message: 'There was an error getting the zoo.', error});
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
