// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')

//Create a new post
//==============================|
async function create(post) {
  const ids = await db('posts')
    .insert(post)
    .returning('*')

  return findById(ids[0])
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
    .first()
}
//------------------------------|

//Update post by id
//==============================|
async function update(id, changes) {
  await db('posts')
    .where({ id })
    .update(changes)
    .returning('*')

  return findById(id)
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
