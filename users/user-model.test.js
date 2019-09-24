// IMPORTS/INITIALIZATION =========================|
// ================================================|
const server = require('../api/server.js')
const Users = require('./user-model.js')
const db = require('../data/dbConfig.js')
// ------------------------------------------------|
// TESTING ========================================|
// ================================================|
describe('the user model', () => {
  // ==============================================|
  // SETUP FOR TESTING ----------------------------|
  // ==============================================|
  // reset before running tests -------------------|
  afterAll(async () => {
    return await db('users').truncate()
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
  // test add() user helper -----------------------|
  describe('add user method', () => {
    it('should add a user to the database', async () => {
      // use add method to add user to db
      await Users.add(testUser)

      // check if the user was added
      const userAdded = await db('users')
        .where({ username: testUser.username })
        .first()

      // assertions
      expect(userAdded.id).toBe(1)
    })
  })
  // ==============================================|
  // test find() user helper ----------------------|
  describe('find users method', () => {
    it('should return a list of users from the database', async () => {
      // use find method to store array of users
      const users = await Users.findAll()

      // assertions
      expect(users).toEqual(expect.anything())
      expect(users.length).toBe(1)
    })
  })
  // ==============================================|
  // test findBy(filter) user helper --------------|
  describe('findBy filter method', () => {
    it('should return a user by using a filter', async () => {
      // use findBy() to find the user
      const user = await Users.findBy({ username: testUser.username })

      // assertions
      expect(user.id).toEqual(1)
    })
  })
  // ==============================================|
  // test findById(id) user helper ----------------|
  describe('findById helper method', () => {
    it('should return a user by id', async () => {
      // use findById() to find the user
      const user = await Users.findById(1)

      // assertions
      expect(user.id).toBe(1)
    })
  })
  // clean up -------------------------------------|
  afterAll(async () => {
    await db('users').truncate()
  })
})
