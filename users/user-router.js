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
router.get('/', restricted, (req, res) => {
  Users.find()
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
// EXPORT =========================================|
// ================================================|
module.exports = router
