const faker = require('faker');

const createFakerAccount = () => ({
  name: faker.name.firstName(),
  gender: genders[Math.floor(Math.random() * Math.floor(2))],
  age: Math.floor(Math.random() * 50) + 1,
  family_id: Math.floor(Math.random() * 100) + 1
});

const genders = ['male', 'female']

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('individuals').truncate()
    .then(function () {
      // Inserts seed entries
      const fakeIndividuals = [];
      const desiredFakeIndividuals = 200;
      for (let i = 0; i < desiredFakeIndividuals; i++) {
        fakeIndividuals.push(createFakerAccount());
      }

      return knex('individuals').insert(fakeIndividuals);
    });
};
