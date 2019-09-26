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
    return await db('posts').truncate()
  })

  // define test post -----------------------------|
  const testPost = {
    title: 'Test Post',
    date: null,
    city: 'Avon',
    country: 'United States',
    content: 'Test Content',
    imageURL: 'http://picture.com',
    user_id: 1
  }
  // define test user -----------------------------|
  const testUser = {
    fname: 'Test',
    lname: 'User',
    username: 'testUser',
    password: 'pass123',
    email: 'test@test.com'
  }
  // ----------------------------------------------|
  // ADD POST METHOD ==============================|
  // ==============================================|
  describe('the add post helper method', () => {
    it('should add a post to the database', async () => {
      // add user to db
      await db('users')
        .insert(testUser)
        .returning('*')

      // use add method to add post to db
      const newPost = await Posts.add(testPost)

      // assertions
      expect(newPost.title).toBe('Test Post')
    })
  })
  // ----------------------------------------------|
  // FIND METHOD ==================================|
  // ==============================================|
  describe('the find post helper method', () => {
    it('should return a list of posts from the database', async () => {
      // use find method to find all posts from db
      const posts = await Posts.find()

      // assertions
      expect(posts.length).toBe(1)
    })
  })
  // ----------------------------------------------|
  // FIND BY METHOD ===============================|
  // ==============================================|
  describe('the findBy post helper method', () => {
    it('should find a post by passing in a filter', async () => {
      // use findBy method to find a post
      const post = await Posts.findBy({ id: 1 }).first()

      // assertions
      expect(post.title).toBe('Test Post')
    })
  })
  // ----------------------------------------------|
  // UPDATE METHOD ================================|
  // ==============================================|
  describe('the update post helper method', () => {
    it('should update a post in the database', async () => {
      const changes = {
        ...testPost,
        title: 'Updated Post',
        content: 'Updated Content'
      }

      // use update method to change a post
      const updatedPost = await Posts.update(1, changes)

      expect(updatedPost.title).toBe('Updated Post')
      expect(updatedPost.content).toBe('Updated Content')
    })
  })
  // ----------------------------------------------|
  // REMOVE METHOD ================================|
  // ==============================================|
  describe('the remove post helper method', () => {
    it('should remove a post from the database', async () => {
      // use remove method to remove a post
      await Posts.remove(1)

      const getAllPosts = await db('posts')

      expect(getAllPosts.length).toBe(0)
    })
  })
  // ----------------------------------------------|
})
