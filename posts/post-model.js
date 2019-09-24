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
//==============================|
function update(id, changes) {
    return db('posts')
        .where({ id })
        .update(changes)
}
//------------------------------|

//Remove post
//==============================|
function remove(id) {
    return db('posts')
        .where({ id })
        .del()
}
//------------------------------|

module.exports = {
    create,
    find,
    findById,
    update,
    remove
}