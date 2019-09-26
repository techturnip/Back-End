// IMPORTS/INITIALIZATION =========================|
// ================================================|
const router = require('express').Router()
const Posts = require('../posts/post-model.js')
const restricted = require('../auth/restricted-middleware.js')
// ------------------------------------------------|
// DEFINE ENDPOINTS ===============================|
// ================================================|
// base url '/api/posts' --------------------------|
// ------------------------------------------------|

//Get all posts
//=================================================|
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find()

    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({
      message: 'Error getting posts'
    })
  }
})
// ------------------------------------------------|

//Get post by id
//=================================================|
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await Posts.findById(id)

    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: 'Could not find the specified post'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error getting specified post'
    })
  }
})
// ------------------------------------------------|

//Post a post
//=================================================|
router.post('/', restricted, async (req, res) => {
  const post = req.body

  const { user_id } = post

  if (req.decodedToken.sub === Number(user_id)) {
    try {
      const newPost = await Posts.create(post)

      res.status(201).json({
        message: 'Post successfully created',
        post: newPost
      })
    } catch (err) {
      res.status(500).json({
        message: 'Error creating new post'
      })
    }
  } else {
    res.status(401).json({
      message: 'Not authorized to make a post for this user'
    })
  }
})
// ------------------------------------------------|

//Update post
//=================================================|
router.put('/:id', restricted, async (req, res) => {
  const { id } = req.params
  const changes = req.body
  const { user_id } = changes

  if (id) {
    if (req.decodedToken.sub === Number(user_id)) {
      try {
        const updatedPost = await Posts.update(id, changes)

        res.status(200).json({
          message: 'Post successfully updated',
          post: updatedPost
        })
      } catch (err) {
        res.status(500).json({
          message: 'Error updating this post'
        })
      }
    } else {
      res
        .status(401)
        .json({ message: 'User is not authorized to update this post' })
    }
  } else {
    res.status(400).json({ message: 'Could not find a valid id from the url' })
  }
})
// ------------------------------------------------|

//Remove post
//=================================================|
router.delete('/:id/user/:user_id', restricted, async (req, res) => {
  const { id, user_id } = req.params

  if (id) {
    if (req.decodedToken.sub === Number(user_id)) {
      try {
        const removed = await Posts.remove(id)

        res.status(200).json({
          message: 'Post was successfully deleted',
          deleted: Boolean(removed)
        })
      } catch (err) {
        res.status(500).json({
          message: 'Error removing post from the database'
        })
      }
    } else {
      res.status(401).json({
        message: 'You are not authorized to delete this post'
      })
    }
  } else {
    res.status(400).json({ message: 'Could not find a valid id from the url' })
  }
})
// ------------------------------------------------|

// EXPORT =========================================|
// ================================================|
module.exports = router
