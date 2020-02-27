// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// DEFINE DB HELPERS ==============================|
// ================================================|
const add = async post => {
  const ids = await db('posts')
    .insert(post)
    .returning('id')

  return db('posts')
    .where({ id: ids[0] })
    .first()
}
// ------------------------------------------------|
const find = () => db('posts')
// ------------------------------------------------|
const findBy = filter => db('posts').where(filter)
// ------------------------------------------------|
const update = async (id, changes) => {
  await db('posts')
    .where({ id })
    .update(changes)
    .returning('*')

  return findBy({ id }).first()
}
// ------------------------------------------------|
const remove = id =>
  db('posts')
    .where({ id })
    .del()
// EXPORT =========================================|
// ================================================|
module.exports = {
  add,
  find,
  findBy,
  update,
  remove
}
