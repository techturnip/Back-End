// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// DEFINE DB HELPERS ==============================|
// ================================================|
const add = async user => {
  const ids = await db('users')
    .insert(user)
    .returning('id')

  return findBy({ id: ids[0] })
}
// ------------------------------------------------|
const update = async (id, changes) => {
  await db('users')
    .where({ id })
    .update(changes)

  return await db('users')
    .where({ id })
    .first()
}
// ------------------------------------------------|
const findBy = filter =>
  db('users')
    .where(filter)
    .first()
// ------------------------------------------------|
const findAll = () => db('users')
// ------------------------------------------------|
const findById = id =>
  db('users')
    .where({ id })
    .first()
// ------------------------------------------------|
const remove = id =>
  db('users')
    .where({ id })
    .del()
// EXPORT =========================================|
// ================================================|
module.exports = {
  add,
  update,
  remove,
  findBy,
  findAll,
  findById
}
