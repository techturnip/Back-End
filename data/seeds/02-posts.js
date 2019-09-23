
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          date: 'today',
          user_id: 1,
          title: 'admin post',
          city: 'Los Angeles',
          country: 'United States',
          content: 'this post was created by an admin',
          imageURL: 'https://assets-global.website-files.com/5cd091cfb5499f22bdf72905/5cf7217e63b1af258e798a8c_lambda_shield.png'
        }
      ]);
    });
};
