// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// DEFINE DB HELPERS ==============================|
// ================================================|
// Sep. 21 - Refactored for modularity ------------|
const add = newUser => db('users').insert(newUser)
// ------------------------------------------------|
// Sep. 21 - Refactored for modularity ------------|
const find = () => db('users').select('id', 'username')
// ------------------------------------------------|
// Sep. 21 - Refactored for modularity ------------|
const findBy = filter => db('users').where(filter)
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = {
  add,
  find,
  findBy
}
