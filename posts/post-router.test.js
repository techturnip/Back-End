// IMPORTS/INITIALIZATION =========================|
// ================================================|
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')
const knexCleaner = require('knex-cleaner')
const jwt = require('jsonwebtoken')
// ------------------------------------------------|
// TESTING ========================================|
// ================================================|
describe('the post router', () => {
  // ==============================================|
  // SETUP FOR TESTING ----------------------------|
  // ==============================================|
  // setup knex cleaner
  const options = {
    mode: 'truncate',
    restartIdentity: true
  }
  // reset before running tests -------------------|
  beforeEach(async () => {
    return await knexCleaner.clean(db, options)
  })
  afterEach(async () => {
    return await knexCleaner.clean(db, options)
  })
  // setup jwt ------------------------------------|
  const generateToken = user => {
    const payload = {
      sub: user.id,
      username: user.username
    }

    const options = {
      expiresIn: '1h'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
  }
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
  // ==============================================|
  // TEST GET ALL POSTS ENDPOINT ------------------|
  describe('GET /api/posts', () => {
    it('should return status 200', async () => {
      return await request(server)
        .get('/api/posts')
        .expect(200)
    })
    it('should return a list of posts', async () => {
      // add test user to db
      await db('users').insert(testUser)

      // // generate token from test user
      // const token = generateToken(user[0])

      // add testpost to db
      await db('posts').insert(testPost)

      // attempt to get list of posts via router
      const posts = await request(server)
        .get('/api/posts/')
        .expect(200)

      expect(posts.body.length).toBe(1)
    })
  })
  // ==============================================|
  // TEST GET POST BY ID ENDPOINT -----------------|
  describe('GET /api/posts/:id', () => {
    it('should return status 200', async () => {
      await db('users').insert(testUser)

      await db('posts').insert(testPost)

      return await request(server)
        .get('/api/posts/1')
        .expect(200)
    })
    it('should return a single post', async () => {
      await db('users').insert(testUser)

      await db('posts').insert(testPost)

      const res = await request(server)
        .get('/api/posts/1')
        .expect(200)

      expect(res.body.id).toBe(1)
    })
  })
  // ==============================================|
  // ADD A POSTS ENDPOINT -------------------------|
  describe('POST /api/posts', () => {
    it('should return status 400 without token', async () => {
      return await request(server)
        .post('/api/posts')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      return await request(server)
        .post('/api/posts')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return status 401 if user id !== token id', async () => {
      // add test user to db
      const user = await db('users')
        .insert(testUser)
        .returning('*')

      // generate token from test user
      const token = generateToken(user[0])

      // add second test user to db
      const testUser2 = {
        ...testUser,
        username: 'testUser2',
        email: 'testUser2@test.com'
      }

      // add 2nd test user to db
      await db('users').insert(testUser2)

      return await request(server)
        .post('/api/posts')
        .set('Authorization', token)
        .expect(401)
    })
    it('should return status 201 if successful', async () => {
      // add test user to db
      const user = await db('users')
        .insert(testUser)
        .returning('*')

      // generate token from test user
      const token = generateToken(user[0])

      // attempt to create post
      return await request(server)
        .post('/api/posts')
        .send(testPost)
        .set('Authorization', token)
        .expect(201)
    })
  })
  // ==============================================|
  // ADD A POSTS ENDPOINT -------------------------|
  describe('PUT /api/posts/:id', () => {
    it('should return status 400 without token', async () => {
      // attempt to make request with no auth token
      return await request(server)
        .put('/api/posts/1')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      // attempt to make request with invalid auth token
      return await request(server)
        .put('/api/posts/1')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return status 400 with invalid id', async () => {
      // add testUser to db
      const user = await db('users')
        .insert(testUser)
        .returning('*')

      // generate taken from test user
      const token = generateToken(user)

      // insert the testPost into db
      await db('posts').insert(testPost)

      // attempt to update the testPost passing an
      // invalid id
      return await request(server)
        .put('/api/posts/:id')
        .set('Authorization', token)
        .send(testPost)
        .expect(400)
    })
    it('should return status 401 if user id !== token id', async () => {
      // add test user to db
      const user = await db('users')
        .insert(testUser)
        .returning('*')

      // generate token from test user
      const token = generateToken(user[0])

      // add testPost to db
      await db('posts').insert(testPost)

      // define changes
      const changes = {
        ...testPost,
        title: 'Updated Post',
        user_id: 2
      }

      // attempt to update the testPost
      return await request(server)
        .put('/api/posts/1')
        .set('Authorization', token)
        .send(changes)
        .expect(401)
    })
    it('should return status 200 if successful', async () => {
      // add test user to db
      const user = await db('users')
        .insert(testUser)
        .returning('*')

      // generate token from test user
      const token = generateToken(user[0])

      // add testPost to db
      await db('posts').insert(testPost)

      // define changes
      const changes = {
        ...testPost,
        title: 'Updated Post'
      }

      // attempt to update the testPost
      return await request(server)
        .put('/api/posts/1')
        .set('Authorization', token)
        .send(changes)
        .expect(200)
    })
  })
  // ==============================================|
  // ADD A POSTS ENDPOINT -------------------------|
  describe('DELETE /api/posts/:id/user/:user_id', () => {
    it('should return status 400 without token', async () => {
      // attempt to make request with no auth token
      return await request(server)
        .delete('/api/posts/1/user/1')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      // attempt to make request with invalid auth token
      return await request(server)
        .delete('/api/posts/1/user/1')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return status 401 if user id !== token id', async () => {
      // add test user to db
      const user = await db('users')
        .insert(testUser)
        .returning('*')

      // generate token from test user
      const token = generateToken(user[0])

      // add test post to db
      await db('posts').insert(testPost)

      return await request(server)
        .del('/api/posts/1/user/2')
        .set('Authorization', token)
        .expect(401)
    })
    it('should return status 200 if successful', async () => {
      // add test user to db
      const user = await db('users')
        .insert(testUser)
        .returning('*')

      // generate token from test user
      const token = generateToken(user[0])

      // add test post to db
      await db('posts').insert(testPost)

      // attempt to remove post from db
      const removed = await request(server)
        .del('/api/posts/1/user/1')
        .set('Authorization', token)
        .expect(200)

      expect(removed.body.deleted).toBe(true)
    })
  })
})
