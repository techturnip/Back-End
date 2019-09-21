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
    let user = req.body;

    user.password = bcrypt.hashSync(user.password, 10)

    Users.register(user)
        .then(registered => {
            const token = generateToken(registered)
            
            res.status(201).json({ user: registered, token })
        })
        .catch(err => {
            res.status(500).json({ error: 'Error registering' });
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.login({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user)

                res.status(200).json({message: 'Login was successful.', token})
            } else {
                res.status(401).json({ message: 'Not valid username or password'})
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error logging in' });
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
