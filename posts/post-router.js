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
        .catch(err => {
            res.status(500).json({ message: 'Error creating posts' })
        })
})
// ------------------------------------------------|

//Update post
//=================================================|
router.put('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Posts.update(id, changes)
    //Function to see if post id
        // .then(post => {
        //     if(id > Posts.find().length){
        //         if (!changes) {
        //             res.status(404).json({ message: `Please fill out all information lines.`})
        //         } else {
        //             res.status(201).json({ message: `Post has been updated.`})
        //         }   
        //     } else {
        //         res.status(404).json({ message: `there is no post with this id.`})
        //     }
        // })
        .then(post => {
                if (!changes) {
                    res.status(404).json({ message: `Please fill out all information lines.`})
                } else {
                    res.status(201).json({ message: `Post has been updated.`})
                }
            })
        .catch(err => {
            res.status(500).json({ message: 'Error updating post' })
        })
})
// ------------------------------------------------|

//Remove post
//=================================================|
router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Posts.remove(id)
    .then(deleted => {
        res.status(204).json({ message: `Post has been deleted.`})
    })
    .catch(err => {
        res.status(500).json({ message: 'Error deleting post' })
    })
})
// ------------------------------------------------|

// EXPORT =========================================|
// ================================================|
module.exports = router
