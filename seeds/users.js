const md5 = require('md5');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          display_name: 'Admin Duc',
          email: "danghung020195@gmail.com",
          password: md5("123456"),
          address: "Ho Chi Minh",
          gender: 1,
          status: 1,
          level: 1,
          phone: "84914339534",
          find_raw: "danghung020195@gmail.com"
        },
      ]);
    });
};
