const faker = require('faker');

const createFakerResponse = () => ({
  response: faker.hacker.phrase(),
  survey_id: Math.floor(Math.random() * 5) + 1,
  question_id: Math.floor(Math.random() * 100) + 1,
  individual_id: Math.floor(Math.random() * 100) + 1,
  family_id: Math.floor(Math.random() * 70) + 1
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('responses').truncate()
    .then(function () {
      // Inserts seed entries
      const fakeResponses = [];
      const desiredFakeResponses = 99;
      for (let i = 1; i < desiredFakeResponses; i++) {
        fakeResponses.push(createFakerResponse());
      }

      return knex('responses').insert(fakeResponses);
    });
};