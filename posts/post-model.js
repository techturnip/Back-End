//Imports
//==============================|
const db = require('../data/dbConfig.js')

//Create a new post
//==============================|
function create(post) {
    return db('posts').insert(post)
}
//------------------------------|

//Find all post
//==============================|
function find() {
    return db('posts')
}
//------------------------------|

//Find post by id
//==============================|
function findById(id) {
    return db('posts')
    .where({ id })
    .first();
}
//------------------------------|

//Update post by id
function update() {
    return db('posts')
}

function remove() {
    return db('posts')
}

// //Find post by user
// //==============================|
// function findByUser() {
//     return db('posts')
//     .where({ user_id })
//     .first();
// }
// //------------------------------|

module.exports = {
    create,
    find,
    findById,
    // findByUser,
    update,
    remove
}