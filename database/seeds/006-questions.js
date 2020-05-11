const faker = require('faker');

const createFakerQuestion = () => ({
  question: faker.hacker.phrase(),
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('questions').truncate()
    .then(function () {
      // Inserts seed entries
      const fakeQuestions = [];
      const desiredFakeQuestions = 100;
      for (let i = 0; i < desiredFakeQuestions; i++) {
        fakeQuestions.push(createFakerQuestion());
      }

      return knex('questions').insert(fakeQuestions);
    });
};