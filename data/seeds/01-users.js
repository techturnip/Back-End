const bcrypt = require('bcryptjs')
const faker = require('faker')
const knexCleaner = require('knex-cleaner')

// set options for knex cleaner
const options = {
  mode: 'truncate',
  restartIdentity: true,
  ignoreTables: ['posts']
}

exports.seed = knex => {
  // cleans users table from the db
  return knexCleaner.clean(knex, options).then(() => {
    // set empty array to store the generated users
    const users = []
    // set the number of users to generate
    const numOfUsers = 25

    // loop over the number of users
    for (let i = 0; i < numOfUsers; i++) {
      // store password to be ran through bcrypt
      const password = faker.internet.password()

      // each iteration will generate a user object
      const user = {
        fname: faker.name.firstName(),
        lname: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(password, 10)
      }

      // console.log() the id, username, and password
      // so that the generated users can be used
      console.log(
        `id: ${i + 1}\nusername: ${user.username}\npassword: '${password}'\n`
      )

      // push the user to the array above
      users.push(user)
    }

    // insert the array of users into the database
    return knex('users').insert(users)
  })
}
