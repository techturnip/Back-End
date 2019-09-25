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
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting posts' })
    })
})
// ------------------------------------------------|

//Get post by id
//=================================================|
router.get('/:id', (req, res) => {
  const { id } = req.params

  Posts.findById(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting posts' })
    })
})
// ------------------------------------------------|

//Post a post
//=================================================|
router.post('/', (req, res) => {
  const postInfo = req.body

  Posts.create(postInfo)
    .then(post => {
      if (!postInfo) {
        res
          .status(404)
          .json({ message: `Please fill out all information lines.` })
      } else {
        res.status(201).json({ message: `Post has been sucessfully posted.` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error creating posts' })
    })
})
// ------------------------------------------------|

//Update post
//=================================================|
router.put('/:id', restricted, (req, res) => {
  const { id } = req.params
  const changes = req.body

  console.log(req.decodedToken)

  if (id) {
    if (req.decodedToken.sub === changes.user_id) {
      Posts.update(id, changes)
        .then(post => {
          res.status(200).json({ post })
        })
        .catch(err => {
          res.status(500).json({ error: 'Error updating with specified id.' })
        })
    } else {
      res.status(401).json({ message: 'User is not authorized to update' })
    }
  } else {
    res.status(400).json({ message: 'Please insert ID.' })
  }

  //Default update function
  // .then(post => {
  //         if (!changes) {
  //             res.status(404).json({ message: `Please fill out all information lines.`})
  //         } else {
  //             res.status(201).json({ message: `Post has been updated.`})
  //         }
  //     })
  // .catch(err => {
  //     res.status(500).json({ message: 'Error updating post' })
  // })
})
// ------------------------------------------------|

//Remove post
//=================================================|
router.delete('/:user_id', restricted, (req, res) => {
  const { id } = req.params

  if (id) {
    Posts.remove(id)
      .then(deleted => {
        res.status(200).json({ message: `Post has been deleted.` })
      })
      .catch(err => {
        res.status(500).json({ message: 'Error deleting post' })
      })
  } else {
    res.status(400).json({ message: 'Please insert ID.' })
  }
})
// ------------------------------------------------|

// EXPORT =========================================|
// ================================================|
module.exports = router
