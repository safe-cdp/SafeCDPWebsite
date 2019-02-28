const express = require('express');
const router = express.Router();
const db = require('../dbConfig');

router
  .get('/', (req, res) => {
    db('config')
      .then(config => res.json(config[0]))
      .catch(err => res.status(500).json(err));
  })
  .put('/', (req, res) => {
    const config = req.body;
    const id = 1;
    db('config')
      .where('id', id)
      .update(config)
      .then(ids => res.json(ids[0]))
      .catch(err => res.status(500).json(err));
  })
  .post('/', (req, res) => {
    const config = req.body;
    db('config')
      .insert(config)
      .then(ids => res.status(201).json(ids[0]))
      .catch(err => res.status(500).json(err));
  });

module.exports = router;
