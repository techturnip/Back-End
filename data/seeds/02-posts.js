const faker = require('faker')
const knexCleaner = require('knex-cleaner')
const axios = require('axios')

// set options for knex cleaner
const options = {
  mode: 'truncate',
  restartIdentity: true,
  ignoreTables: ['users']
}

exports.seed = knex => {
  // cleans posts table from the db
  return knexCleaner.clean(knex, options).then(async () => {
    // set empty array to store generated posts
    const posts = []

    // set number of posts to generate
    const numOfPosts = 50

    // grabs a list of images from img api to populate the
    // imageURL field of the post object
    const imagesURL = `https://picsum.photos/v2/list?limit=${numOfPosts}`
    const getImages = await axios.get(imagesURL)
    // array of images
    const images = getImages.data

    // loop over the number of posts
    for (i = 0; i < numOfPosts; i++) {
      // each iterations will generate a user object
      const post = {
        // set the user_id field to a random number
        // between 1 and 25
        user_id: Math.floor(Math.random() * 25) + 1,
        date: faker.date.past(),
        title: faker.lorem.words(),
        city: faker.address.city(),
        country: faker.address.country(),
        content: faker.lorem.paragraph(),
        // build a url to reference an image from the img
        // api by passing in an id from the api call above
        imageURL: `https://picsum.photos/id/${images[i].id}/300/300`
      }

      // push the post obj to the array above
      posts.push(post)
    }

    // insert array of posts into the db
    return knex('posts').insert(posts)
  })
}
