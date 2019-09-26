// IMPORTS/INITIALIZATION =========================|
// ================================================|
const Posts = require('./post-model.js')
const db = require('../data/dbConfig.js')
const knexCleaner = require('knex-cleaner')
// ------------------------------------------------|
// TESTING ========================================|
// ================================================|
describe('the post model', () => {
  // ==============================================|
  // SETUP FOR TESTING ----------------------------|
  // ==============================================|
  // setup knex cleaner
  const options = {
    mode: 'truncate',
    restartIdentity: true
  }
  // reset before running tests -------------------|
  beforeAll(async () => {
    return await knexCleaner.clean(db, options)
  })
  // clean up -------------------------------------|
  afterAll(async () => {
    await db('users').truncate()
  })

  // define test post -----------------------------|
  const testPost = {
    title: 'Test Post',
    date: null,
    city: 'Avon',
    country: 'United States',
    content: 'Test Content',
    imageURL: 'http://picture.com',
    user_id: 26
  }
})
