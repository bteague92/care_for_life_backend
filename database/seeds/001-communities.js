
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('communities').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('communities').insert([
        {
          name: 'community one'
        },
        {
          name: 'community two'
        },
        {
          name: 'community three'
        },
        {
          name: 'community four'
        }
      ]);
    });
};
