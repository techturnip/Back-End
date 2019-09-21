exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users
        .increments('id')
        .primary()
        .notNullable()

      // First Name - REQUIRED
      users.string('fname', 128).notNullable()

      // Last Name - REQUIRED
      users.string('lname', 128).notNullable()

      // email - REQUIRED
      users
        .string('email', 128)
        .notNullable()
        .unique()

      // username - REQUIRED
      users
        .string('username', 128)
        .notNullable()
        .unique()

      // password - REQUIRED
      users.string('password', 128).notNullable()
    })

    .createTable('posts', posts => {
      posts.increments()

      // date field for when pic was taken
      posts.date('date')

      // foreign key for user relationship - REQUIRED
      posts
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable()

      // title of the post - REQUIRED
      posts.string('title', 256).notNullable()

      // location
      posts.string('city', 128)
      posts.string('country', 128)

      // text content - REQUIRED
      posts.string('content').notNullable()

      // URL of the image
      posts.string('imageURL')

      // timestamps for when the post was created
      posts.timestamps(true, true)
    })
}

exports.down = function(knex) {
  knex.schema.dropTableIfExists('users').dropTableIfExists('posts')
}
