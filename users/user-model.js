// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// DEFINE DB HELPERS ==============================|
// ================================================|
// Sep. 21 - Refactored for modularity ------------|
const add = async user => {
  const ids = await db('users')
    .insert(user)
    .returning('id')

  return findBy({ id: ids[0] })
}
// ------------------------------------------------|
const update = async (id, changes) => {
  const ids = await db('users')
    .where({ id })
    .update(changes)
    .returning('id')

  return findBy({ id: ids[0] })
}
// ------------------------------------------------|
// Sep. 21 - Refactored for modularity ------------|
const findBy = filter =>
  db('users')
    .where(filter)
    .first()
// ------------------------------------------------|
// Sep. 21 - Refactored for modularity ------------|
const findAll = () => db('users')
// ------------------------------------------------|
// Sept. 21 - Added -------------------------------|
const findById = id =>
  db('users')
    .where({ id })
    .first()
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = {
  add,
  update,
  findBy,
  findAll,
  findById
}
