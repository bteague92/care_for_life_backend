const faker = require('faker');

const createFakerAccount = () => ({
  name: faker.name.firstName(),
  zone_id: Math.floor(Math.random() * 30) + 1
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('families').truncate()
    .then(function () {
      // Inserts seed entries
      const fakeFamilies = [];
      const desiredFakeFamilies = 100;
      for (let i = 0; i < desiredFakeFamilies; i++) {
        fakeFamilies.push(createFakerAccount());
      }

      return knex('families').insert(fakeFamilies);
    });
};

