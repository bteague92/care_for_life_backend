const faker = require('faker');

const createFakerAccount = () => ({
  name: faker.name.firstName(),
  community_id: Math.floor(Math.random() * 4) + 1
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('zones').truncate()
    .then(function () {
      // Inserts seed entries
      const fakeZones = [];
      const desiredFakeZones = 30;
      for (let i = 0; i < desiredFakeZones; i++) {
        fakeZones.push(createFakerAccount());
      }

      return knex('zones').insert(fakeZones);
    });
};
