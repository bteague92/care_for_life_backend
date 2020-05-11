const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findByQuestionId
};

async function find() {
    return db('responses as r')
        .join('surveys as s', 's.id', 'r.survey_id')
        .join('questions as q', 'q.id', 'r.question_id')
        .join('individuals as i', 'i.id', 'r.individual_id')
        .join('families as f', 'f.id', 'r.family_id')
        .select("r.id", "r.response", "r.survey_id", 's.name as survey_name', "r.question_id", 'q.question as question', "r.individual_id", 'i.name as individuals_name', "r.family_id", 'f.name as individuals_family_name');
}

function findBy(filter) {
    return db('responses').where(filter);
}

async function add(user) {
    const [id] = await db('responses').insert(user);
    return findById(id);
}

function findById(id) {
    return db('responses').where('id', id).select("id", "response", "survey_id", "question_id", "individual_id", "family_id").first();
}

function findByQuestionId(id) {
    return db('responses as r')
        .where('question_id', id)
        .join('surveys as s', 's.id', 'r.survey_id')
        .join('questions as q', 'q.id', 'r.question_id')
        .join('individuals as i', 'i.id', 'r.individual_id')
        .join('families as f', 'f.id', 'r.family_id')
        .select("r.id", "r.response", "r.survey_id", 's.name as survey_name', "r.question_id", 'q.question as question', "r.individual_id", 'i.name as individuals_name', "r.family_id", 'f.name as individuals_family_name');
}

function update(id, changes) {
    return db('responses')
        .where('id', id)
        .update(changes, 'id')
        .then(() => {
            return findById(id);
        });

}

function remove(id) {
    return db('responses').where('id', id).del()
}