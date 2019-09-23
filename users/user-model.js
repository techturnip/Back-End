// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// DEFINE DB HELPERS ==============================|
// ================================================|
// Sep. 21 - Refactored for modularity ------------|
const add = async user => {
  const addedUser = await db('users')
    .returning()
    .insert(user)

  return findById(addedUser[0])
}
// ------------------------------------------------|
// Sep. 21 - Refactored for modularity ------------|
const find = () => db('users')
// ------------------------------------------------|
// Sep. 21 - Refactored for modularity ------------|
const findBy = filter => db('users').where(filter)
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
  find,
  findBy,
  findById
}
