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

// Find
const findPosts = id =>
  db('posts as p')
    .join('users as u', 'u.id', 'p.id')
    .select(
      'p.id',
      'p.user_id',
      'p.title',
      'p.city',
      'p.country',
      'p.content',
      'p.imageURL'
    )

// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = {
  add,
  findBy,
  findAll,
  findById,
  findPosts
}
