const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const { isLoggedIn, isAdmin } = require('../middlewares/middleware');

router.get('/', (req, res) => {
  db('posts')
    .then(posts =>
      !posts.length
        ? res.status(404).json({
            message: 'There is no post just yet, please try again later!'
          })
        : res.json(posts)
    )
    .catch(err => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
    .where('id', id)
    .first()
    .then(post => {
      db('comments')
        .where('post_id', id)
        .then(comments => {
          res.json({ ...post, comments });
        });
    })
    .catch(err => res.status(500).json(err));
});
router.post('/', isLoggedIn, isAdmin, (req, res) => {
  const { description, likes, image, created_at, user_id } = req.body;
  const post = { description, likes, image, created_at, user_id };
  !post
    ? res
        .status(401)
        .json({ error: 'Check the submitted information and try again.' })
    : db('posts')
        .insert(post)
        .then(ids => res.json(ids[0]))
        .catch(err => res.status(500).json(err));
});
router.put('/:id', isLoggedIn, isAdmin, (req, res) => {
  const { id } = req.params;
  const { description, likes, image, created_at, user_id } = req.body;
  const post = { description, likes, image, created_at, user_id };
  db('posts')
    .where('id', id)
    .update(post)
    .then(count =>
      !count
        ? res
            .status(404)
            .json({ message: 'There is no post with the specified ID' })
        : res.json(count)
    )
    .catch(err => res.status(500).json(err));
});
router.delete('/:id', isLoggedIn, isAdmin, (req, res) => {
  const { id } = req.params;
  db('posts')
    .where('id', id)
    .del()
    .then(count =>
      !count
        ? res
            .status(404)
            .json({ message: 'There is no post with the specified ID' })
        : res.status(201).json(count)
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
