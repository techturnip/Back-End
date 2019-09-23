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
router.get('/', restricted, (req,res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error getting users.' })
        })
})

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;
    
    Users.findById(id)
        .then(users => {
            if (users){
                res.status(200).json(users)
            } else {
                res.status(404).json({ message: 'Could not find user with this id.' })
            }
            
        })
        .catch(err => {
            res.status(500).json({ message: `Error getting user with id equal to ${id}` })
        })
})

router.get('/:id/posts', restricted, (req, res) => {
    const { id } = req.params;

    Users.findPosts(id)
        .then(users => {
            if(users) {
                res.status(200).json(users)
            } else {
                res.status(404).json({ message: `Could not find post from the user with an id of ${id}.` })
            }
            
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting user's posts." })
        })
})
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = router
