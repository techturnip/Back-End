//Imports
//==============================|
const db = require('../data/dbConfig.js')

//Create a new post
//==============================|
function create(post) {
    return('posts').insert(post)
}
//------------------------------|

//Find all post
//==============================|
function find(filter) {
    return db('posts').where(filter);
}
//------------------------------|

//Find post by id
//==============================|
function findById() {
    return db('posts')
    .where({ id })
    .first();
}
//------------------------------|

//Find post by user
//==============================|
function findByUser() {
    return db('posts')
    .where({ user_id })
    .first();
}
//------------------------------|

module.exports = {
    create,
    find,
    findById,
    findByUser
}