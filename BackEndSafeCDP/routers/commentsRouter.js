const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const { isLoggedIn } = require('../middlewares/middleware');

router.get('/', (req, res) => {
  db('comments')
    .then(comments =>
      !comments.length
        ? res.status(404).json({
            message: 'There is no comment just yet, please try again later!'
          })
        : res.json(comments)
    )
    .catch(err => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('comments')
    .where('id', id)
    .then(comment =>
      comment
        ? res.json(comment)
        : res.status(404).json({
            message: 'There is no comment with the specified ID, try again!'
          })
    )
    .catch(err => res.status(500).json(err));
});
router.post('/', isLoggedIn, (req, res) => {
  const { content, user_id, post_id, avatar, username } = req.body;
  const comment = { content, user_id, post_id, avatar, username };
  if (!comment.user_id || !comment.post_id) {
    res.status(400).json({ error: 'user_id and post_id fields are required!' });
  }
  db('comments')
    .insert(comment)
    .then(ids => res.status(201).json(ids[0]))
    .catch(err => res.status(500).json(err));
});
router.put('/:id', isLoggedIn, (req, res) => {
  const { id } = req.params;
  const { content, user_id, post_id, avatar, username } = req.body;
  const comment = { content, user_id, post_id, avatar, username };
  db('comments')
    .where('id', id)
    .update(comment)
    .then(count =>
      !count
        ? res.status(404).json({
            message: 'There is no comment with the specified ID, try again!'
          })
        : res.json(count)
    )
    .catch(err => res.status(500).json(err));
});
router.delete('/:id', isLoggedIn, (req, res) => {
  const { id } = req.body;
  db('comments')
    .where('id', id)
    .del()
    .then(count =>
      !count
        ? res.status(404).json({
            message: 'There is no comment with the specified ID, try again!'
          })
        : res.json(count)
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
