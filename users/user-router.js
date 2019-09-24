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
router.put('/:id', restricted, (req, res) => {
  if(req.decodedToken.sub === Number(req.params.id)){
    const 
  }
})
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = router
