// IMPORTS/INITIALIZATION =========================|
// ================================================|
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// DEFINE DB HELPERS ==============================|
// ================================================|
// Sep. 21 - Refactored for modularity ------------|
const add = async user => {
  const [id] = await db('users').insert(user)
  return findById(id)
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
    .then(console.log(`found user with id of ${id}`))

// Find
const findPosts = id => 
  db('posts as p')
  .join('users as u', 'u.id', 'p.id')
  .select('p.id', 'p.user_id', 'p.title', 'p.city', 'p.country', 'p.content', 'p.imageURL')
  .then(console.log(`found user posts from user with an id of ${id}`))
  
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = {
  add,
  find,
  findBy,
  findById,
  findPosts
}
