// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// DEFINE DB HELPERS ==============================|
// ================================================|
const add = async post => {
  const ids = await db('posts')
    .insert(post)
    .returning('*')

  return findBy({ id: ids[0] })
}
// ------------------------------------------------|
const find = () => db('posts')
// ------------------------------------------------|
const findBy = filter => db('posts').where({ filter })
// ------------------------------------------------|
const update = async (id, changes) => {
  await db('posts')
    .where({ id })
    .update(changes)
    .returning('*')

  return findBy({ id })
}
// ------------------------------------------------|
const remove = id =>
  db('posts')
    .where({ id })
    .del()
function remove(id) {
  return db('posts')
    .where({ id })
    .del()
}
// EXPORT =========================================|
// ================================================|
module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
}
