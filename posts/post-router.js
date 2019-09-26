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
// GET ALL POSTS ----------------------------------|
router.get('/', async (req, res) => {
  try {
    // use db helper to get list of posts
    const posts = await Posts.find()

    // if successful return list of posts
    res.status(200).json(posts)
  } catch (err) {
    // return status 500 if there was an error
    res.status(500).json({
      message: 'Error getting posts'
    })
  }
})
// ------------------------------------------------|
// GET POST BY ID ---------------------------------|
router.get('/:id', async (req, res) => {
  // pull id from url parameter
  const { id } = req.params

  try {
    // use db helper to get a post by id
    const post = await Posts.findBy({ id }).first()

    // check if the post was successful
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
// ADD A POST -------------------------------------|
router.post('/', restricted, async (req, res) => {
  // pull post from req.body
  const post = req.body

  // pull the user_id out of post
  const { user_id } = post

  // Verify the user_id vs the token id to validate
  // the relationship between the created post and
  // the user that is logged in
  if (req.decodedToken.sub === Number(user_id)) {
    // if validation succeeds attempt to add the post
    try {
      const newPost = await Posts.add(post)

      // send success message along with new post details
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
    // if validation fails return unauthorized status code
    res.status(401).json({
      message: 'Not authorized to make a post for this user'
    })
  }
})
// ------------------------------------------------|
// UPDATE A POST ----------------------------------|
router.put('/:id', restricted, async (req, res) => {
  // pull the post id from url parameter
  const { id } = req.params
  // pull the changes from req.body
  const changes = req.body
  // pull the user_id from the changes
  const { user_id } = changes

  // check if there is a valid id in the url
  if (Number(id)) {
    // Verify the user_id vs the token id to validate
    // the relationship between the updated post and
    // the user that is logged in
    if (req.decodedToken.sub === Number(user_id)) {
      // if validated attempt to update the post
      try {
        const updatedPost = await Posts.update(id, changes)

        // send success message along with the
        // updated post details
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
      // if not valid return unauthorized status code
      res
        .status(401)
        .json({ message: 'User is not authorized to update this post' })
    }
  } else {
    // if no valid post id found
    res.status(400).json({ message: 'Could not find a valid id from the url' })
  }
})
// ------------------------------------------------|
// REMOVE A POST ----------------------------------|
router.delete('/:id/user/:user_id', restricted, async (req, res) => {
  // pull the id and user_id from the url parameters
  const { id, user_id } = req.params

  // verify that the url params exist
  if (id && user_id) {
    // Verify the user_id vs the token id to validate
    // the relationship between the post to remove and
    // the user that is logged in
    if (req.decodedToken.sub === Number(user_id)) {
      // if validated attempt to remove the post
      try {
        const removed = await Posts.remove(id)

        // send success message along with converted
        // boolean value from the db
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
      // if not valid return unauthorized status code
      res.status(401).json({
        message: 'You are not authorized to delete this post'
      })
    }
  } else {
    // if url params don't exist return a bad request code
    res.status(400).json({ message: 'Could not find a valid id from the url' })
  }
})
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = router
