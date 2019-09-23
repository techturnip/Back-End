const bcrypt = require('bcryptjs')
const faker = require('faker')
const knexCleaner = require('knex-cleaner')

const options = {
  mode: 'truncate',
  restartIdentity: true,
  ignoreTables: ['posts']
}

exports.seed = knex => {
  // Deletes ALL existing entries
  return knexCleaner.clean(knex, options).then(() => {
    const users = []
    const numOfUsers = 25

    for (let i = 0; i < numOfUsers; i++) {
      const password = faker.internet.password()

      const user = {
        fname: faker.name.firstName(),
        lname: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(password, 10)
      }

      console.log(
        `id: ${i + 1}\nusername: ${user.username}\npassword: '${password}'\n`
      )
      users.push(user)
    }

    return knex('users').insert(users)
  })
}
