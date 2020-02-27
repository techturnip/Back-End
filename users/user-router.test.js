// IMPORTS/INITIALIZATION =========================|
// ================================================|
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')
const knexCleaner = require('knex-cleaner')
// ------------------------------------------------|
// TESTING ========================================|
// ================================================|
describe('the user router', () => {
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
  // define testUser ------------------------------|
  const testUser = {
    fname: 'Test',
    lname: 'User',
    username: 'testUser',
    password: 'pass123',
    email: 'test@test.com'
  }
  // ==============================================|
  // test get all users endpoint ------------------|
  describe('GET /api/users', () => {
    it('should return status 400 with no token', async () => {
      // attempt to get users without a token
      return await request(server)
        .get('/api/users/')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      return await request(server)
        .get('/api/users/')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return status 200 with a valid token', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token } = res.body
      // attempt to get users with valid taken
      return await request(server)
        .get('/api/users/')
        .set('Authorization', token)
        .expect(200)
    })
    it('should return a list of all users', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token } = res.body

      const getList = await request(server)
        .get('/api/users/')
        .set('Authorization', token)
        .expect(200)

      const listOfUsers = getList.body

      expect(listOfUsers.length).toBe(1)
    })
  })
  // ==============================================|
  // test get user by id endpoint -----------------|
  describe('GET /api/users/:id', () => {
    it('should return status 400 with no token', async () => {
      // attempt to get users without a token
      return await request(server)
        .get('/api/users/1')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      return await request(server)
        .get('/api/users/1')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return status 404 with incorrect id', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token } = res.body

      // attempt to get user with an id not associated with a user
      return await request(server)
        .get('/api/users/2')
        .set('Authorization', token)
        .expect(404)
    })
    it('should return status 200 with correct id', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)

      const { token } = res.body

      // attempt to get user with a valid user id
      return await request(server)
        .get('/api/users/1')
        .set('Authorization', token)
        .expect(200)
    })
    it('should return a user object', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token } = res.body

      // use request to get user
      const user = await request(server)
        .get('/api/users/1')
        .set('Authorization', token)
        .expect(200)

      expect(user.body).toEqual({
        id: 1,
        fname: 'Test',
        lname: 'User',
        username: 'testUser'
      })
    })
  })
  // ==============================================|
  // test update user by id endpoint --------------|
  describe('PUT /api/users/:id', () => {
    it('should return status 400 with no token', async () => {
      // attempt to get users without a token
      return await request(server)
        .get('/api/users/1')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      return await request(server)
        .get('/api/users/1')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return status 401 if token id !== user id', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token, user } = res.body

      const changes = {
        ...user,
        username: 'updatedUser'
      }

      return await request(server)
        .put('/api/users/2')
        .set('Authorization', token)
        .send(changes)
        .expect(401)
    })
    it('should return status 200 if token and token id === user id', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token, user } = res.body

      const changes = {
        ...user,
        username: 'updatedUser'
      }

      const updatedUser = await request(server)
        .put('/api/users/1')
        .set('Authorization', token)
        .send(changes)
        .expect(200)

      const { username } = updatedUser.body.user

      expect(username).toBe('updatedUser')
    })
  })
  // ==============================================|
  // test delete user by id endpoint --------------|
  describe('DELETE /api/users/:id', () => {
    it('should return status 400 with no token', async () => {
      // attempt to get users without a token
      return await request(server)
        .get('/api/users/1')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      return await request(server)
        .get('/api/users/1')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return status 401 if token id !== user id', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token } = res.body

      // attempt to delete incorrect user
      return await request(server)
        .del('/api/users/2')
        .set('Authorization', token)
        .expect(401)
    })
    it('should return status 200 if token && token id === user id', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token } = res.body

      // attempt to delete user
      return await request(server)
        .del('/api/users/1')
        .set('Authorization', token)
        .expect(200)
    })
  })
  // ==============================================|
  // test get a list of user's posts endpoint -----|
  describe('GET /api/users/:id/posts', () => {
    it('should return status 400 with no token', async () => {
      // attempt to get users without a token
      return await request(server)
        .get('/api/users/1/posts')
        .expect(400)
    })
    it('should return status 401 with invalid token', async () => {
      return await request(server)
        .get('/api/users/1/posts')
        .set('Authorization', 'thisisaninvalidtoken')
        .expect(401)
    })
    it('should return a status 200 with valid token', async () => {
      // register the test user
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Accept', 'application/json')

      const { token } = res.body

      return await request(server)
        .get('/api/users/1/posts')
        .set('Authorization', token)
        .expect(200)
    })
  })
})
