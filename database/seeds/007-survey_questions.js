const faker = require('faker');

const createFakerAccount = (qid) => ({
  active: faker.random.boolean(),
  question_id: qid,
  survey_id: Math.floor(Math.random() * 5) + 1,
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('survey_questions').truncate()
    .then(function () {
      // Inserts seed entries
      const fakeSurveyQuestions = [];
      const desiredFakeSurveyQuestions = 99;
      for (let i = 1; i < desiredFakeSurveyQuestions; i++) {
        fakeSurveyQuestions.push(createFakerAccount(i));
      }

      return knex('survey_questions').insert(fakeSurveyQuestions);
    });
};