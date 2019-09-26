// IMPORTS/INITIALIZATION =========================|
// ================================================|
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')
const knexCleaner = require('knex-cleaner')
// ------------------------------------------------|
// TESTING ========================================|
// ================================================|
describe('the auth router', () => {
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
  // define testUser ------------------------------|
  const testUser = {
    fname: 'Test',
    lname: 'User',
    username: 'testUser',
    password: 'pass123',
    email: 'test@test.com'
  }
  // ==============================================|
  // test register endpoint -----------------------|
  describe('POST /api/auth/register', () => {
    it('should return status 400 w/ missing user data', async () => {
      const res = await request(server).post('/api/auth/register')
      expect(res.status).toBe(400)
    })
    // --------------------------------------------|
    it('should return status 201 w/ correct data', async () => {
      return await request(server)
        .post('/api/auth/register/')
        .send(testUser)
        .set('Accept', 'application/json')
        .expect(201)
    })
    // --------------------------------------------|
    it('should return the correct object', async () => {
      const res = await request(server)
        .post('/api/auth/register/')
        .send(testUser)

      // destructure response
      const { token, user, message } = res.body

      // assertions
      expect(message).toBe('Registration was successful')
      expect(user).toEqual({
        id: 1,
        fname: 'Test',
        lname: 'User',
        username: 'testUser'
      })
      expect(token).toEqual(expect.anything())
    })
  })
  // ==============================================|
  // test login endpoint --------------------------|
  describe('POST /api/auth/login', () => {
    it('should respond with a 400 without username/password', async () => {
      await request(server)
        .post('/api/auth/login/')
        .send()
        .expect(400)
    })
    // --------------------------------------------|
    it('should respond with a 401 with incorrect username/password', async () => {
      // add test user
      await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201)

      // attempt to login with the wrong credentials
      const res = await request(server)
        .post('/api/auth/login/')
        .send({
          username: 'incorrectUserName',
          password: 'incorrectUserPass'
        })
        .expect(401)

      expect(res.body.message).toBe(
        'Error logging in, please review your username and password'
      )
    })
    // --------------------------------------------|
    it('should return the correct object', async () => {
      // add test user
      await request(server)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201)

      const credentials = { username: 'testUser', password: 'pass123' }

      // login with user
      const res = await request(server)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200)

      // destructure response
      const { token, user, message } = res.body

      // check the response object
      expect(message).toBe('Login was successful')
      expect(user).toEqual({
        id: 1,
        fname: 'Test',
        lname: 'User',
        username: 'testUser'
      })
      expect(token).toEqual(expect.anything())
    })
  })
})
// ================================================|
