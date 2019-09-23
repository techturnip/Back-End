// IMPORTS/INITIALIZATION =========================|
// ================================================|
const router = require('express').Router()
const Posts = require('../posts/post-model.js')
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

//Post a post
//=================================================|
router.post('/', (req, res) => {
    const postInfo = req.body;

    Posts.create(postInfo)
        .then(post => {
            if (!postInfo) {
                res.status(404).json({ message: `Please fill out all information lines.`})
            } else {
                res.status(201).json({ message: `Post has been sucessfully posted.`})
            }
        })
})
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = router
