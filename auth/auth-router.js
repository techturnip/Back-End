// IMPORTS/INITIALIZATION =========================|
// ================================================|
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../users/user-model.js')
// ------------------------------------------------|
// DEFINE ENDPOINTS ===============================|
// ================================================|
// base url '/api/auth' ---------------------------|
// ------------------------------------------------|
router.post('/register', (req, res) => {
  // store user in a variable
  let user = req.body

  // check if username and password exists
  if (user.username && user.password) {
    // run the user's password through hashing func
    user.password = bcrypt.hashSync(user.password, 10)
  } else {
    res.status(400).json({
      message: 'Must provide username & password'
    })
  }

  Users.add(user)
    .then(newUser => {
      // generate token from the new user
      const token = generateToken(newUser)

      res.status(201).json({ user: newUser, token })
    })
    .catch(err => {
      res.status(500).json({ error: 'Error registering' })
    })
})
// ------------------------------------------------|
router.post('/login', (req, res) => {
  const { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({ message: 'Login was successful.', token })
      } else {
        res.status(401).json({ message: 'Not valid username or password' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error logging in' })
    })
})
// ------------------------------------------------|
// Define the token generator ---------------------|
function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = router
