
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('surveys').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('surveys').insert([
        {
          "name": "Individual Weekly Survey",
          "type": "weekly individual"
        },
        {
          "name": "Individual Monthly Survey",
          "type": "monthly individual"
        },
        {
          "name": "Family Annual",
          "type": "annual"
        },
        {
          "name": "Family Monthly",
          "type": "annual"
        },
        {
          "name": "Family Weekly",
          "type": "annual"
        }
      ]);
    });
};
