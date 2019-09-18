// IMPORTS/INITIALIZATION =========================|
// ================================================|
const knex = require('knex')
// ------------------------------------------------|
// bring in knex configuration --------------------|
const knexConfig = require('../knexfile.js')
// ------------------------------------------------|
// set environment --------------------------------|
const environment = process.env.DB_ENV || 'development'
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = knex(knexConfig[environment])
