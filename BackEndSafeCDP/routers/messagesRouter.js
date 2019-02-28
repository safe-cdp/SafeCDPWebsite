const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const { isValidEmail } = require('../middlewares/middleware');

router.get('/', (req, res) => {
  db('messages').then(messages =>
    !messages.length
      ? res.status(404).json({
          message: 'There is no messages just yet, please try again later'
        })
      : res.status(200).json(messages)
  );
});
router.post('/', isValidEmail, (req, res) => {
  const message = req.body;
  db('messages')
    .insert(message)
    .then(ids => res.status(201).json(ids[0]))
    .catch(er => res.status(500).json(err));
});

module.exports = router;
