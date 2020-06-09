// IMPORTS/INITIALIZATION =========================|
// ================================================|
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model.js');
// ------------------------------------------------|
// DEFINE ENDPOINTS ===============================|
// ================================================|
// base url '/api/auth' ---------------------------|
// ------------------------------------------------|
// REGISTER ENDPOINT ------------------------------|
router.post('/register', (req, res) => {
  // store user in a variable
  let user = req.body;

  // check for valid user object
  if (
    user.username &&
    user.password &&
    user.fname &&
    user.lname &&
    user.email
  ) {
    // run the user's password through hashing func
    user.password = bcrypt.hashSync(user.password, 10);

    Users.add(user)
      .then((newUser) => {
        // generate token from the new user
        const token = generateToken(newUser);

        // remove email/password before sending user
        // info to client
        delete newUser.password;
        delete newUser.email;

        // send back new user and token
        res.status(201).json({
          message: 'Registration was successful',
          user: newUser,
          token
        });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error registering' });
      });
  } else {
    res.status(400).json({
      message: 'Please include all required user fields'
    });
  }
});
// ------------------------------------------------|
// LOGIN ENDPOINT ---------------------------------|
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then((user) => {
        // check for user and verify password
        if (user && bcrypt.compareSync(password, user.password)) {
          // generate token for user
          const token = generateToken(user);

          // remove email/password before sending user
          // info to client
          delete user.password;
          delete user.email;

          // send back user and token
          res.status(200).json({
            message: 'Login was successful',
            username: user.username,
            id: user.id,
            token
          });
        } else {
          res.status(401).json({
            message:
              'Error logging in, please review your username and password'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Error retrieving user from the database' });
      });
  } else {
    res.status(400).json({
      message: 'Please include a username and password'
    });
  }
});
// ------------------------------------------------|
// Define the token generator ---------------------|
function generateToken(user) {
  console.log(user);

  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = router;
