const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
};

async function find() {
    return db('survey_questions as sq')
        .join('surveys as s', 's.id', 'sq.survey_id')
        .join('questions as q', 'q.id', 'sq.question_id')
        .select('sq.id', 'sq.active', 'sq.survey_id', 's.name as survey_name', 'sq.question_id', 'q.question')
}

function findBy(filter) {
    return db('survey_questions').where(filter);
}

async function add(sq) {
    const [id] = await db('survey_questions').insert(sq);
    return findById(id);
}

function findById(id) {
    return db('survey_questions').where('id', id).select("id", "active", "survey_id", "question_id").first();
}

function update(id, changes) {
    return db('survey_questions')
        .where('id', id)
        .update(changes, 'id')
        .then(() => {
            return findById(id);
        });

}

function remove(id) {
    return db('survey_questions').where('id', id).del()
}