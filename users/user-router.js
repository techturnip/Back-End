// IMPORTS/INITIALIZATION =========================|
// ================================================|
const router = require('express').Router()
const Users = require('./user-model.js')
const restricted = require('../auth/restricted-middleware.js')
// ------------------------------------------------|
// DEFINE ENDPOINTS ===============================|
// ================================================|
// base url '/api/users' --------------------------|
// ------------------------------------------------|
// GET ALL USERS ----------------------------------|
router.get('/', restricted, (req, res) => {
  Users.findAll()
    .then(users => {
      users.forEach(user => {
        delete user.password
        delete user.email
      })
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting users' })
    })
})

router.get('/:id', restricted, (req, res) => {
  const { id } = req.params

  Users.findById(id)
    .then(users => {
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: 'Could not find user with this id.' })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Error getting user with id equal to ${id}` })
    })
})

router.get('/:id/posts', restricted, (req, res) => {
  const { id } = req.params

  Users.findPosts(id)
    .then(users => {
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({
          message: `Could not find post from the user with an id of ${id}.`
        })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting user's posts." })
    })
})
// ------------------------------------------------|
// GET USER BY ID ---------------------------------|
router.get('/:id', restricted, (req, res) => {
  Users.findBy({ id: req.params.id })
    .then(user => {
      delete user.password
      delete user.email
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(404).json({
        message: 'The specified user could not be found'
      })
    })
})
// ------------------------------------------------|
// UPDATE USER ------------------------------------|
router.put('/:id', restricted, async (req, res) => {
  // pull id from params
  const { id } = req.params

  // check the id stored in token vs the user id from
  // req.params
  if (req.decodedToken.sub === Number(req.params.id)) {
    // pull changes from req.body
    const changes = req.body

    try {
      // update the user
      const updatedUser = await Users.update(id, changes)

      delete updatedUser.password
      delete updatedUser.email

      res.status(200).json({
        message: 'User successfully updated',
        user: updatedUser
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'There was an error updating the user'
      })
    }
  } else {
    res.status(401).json({
      message: 'You are not authorized to update this user'
    })
  }
})
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = router
