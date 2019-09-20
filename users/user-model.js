const db = require('../data/dbConfig.js')

module.exports = {
    register,
    login
}

function register(newUser) {
    return db('users').insert(newUser)
}

function login(user) {
    return db('users').where(user)
}