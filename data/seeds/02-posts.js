const faker = require('faker')
const db = require('../dbConfig.js')
const knexCleaner = require('knex-cleaner')
const axios = require('axios')

const options = {
  mode: 'truncate',
  restartIdentity: true,
  ignoreTables: ['users']
}

exports.seed = knex => {
  return knexCleaner.clean(knex, options).then(async () => {
    const posts = []

    const numOfPosts = 50

    const imagesURL = `https://picsum.photos/v2/list?limit=${numOfPosts}`

    const getImages = await axios.get(imagesURL)

    const images = getImages.data

    for (i = 0; i < numOfPosts; i++) {
      const post = {
        user_id: Math.floor(Math.random() * 25) + 1,
        date: faker.date.past(),
        title: faker.lorem.words(),
        city: faker.address.city(),
        country: faker.address.country(),
        content: faker.lorem.paragraph(),
        imageURL: `https://picsum.photos/id/${images[i].id}/300/300`
      }

      posts.push(post)
    }

    return knex('posts').insert(posts)
  })
}
