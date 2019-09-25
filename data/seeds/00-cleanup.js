const knexCleaner = require('knex-cleaner')

// set options for knex cleaner
const options = {
  mode: 'truncate',
  restartIdentity: true,
  ignoreTables: ['knex_migrations', 'knex_migrations_lock'] // don't empty migration tables
}

exports.seed = knex => {
  return knexCleaner.clean(knex, options)
}
