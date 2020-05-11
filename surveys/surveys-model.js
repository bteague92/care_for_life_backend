const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findSurveyQuestions,
    findByType
};

async function find() {
    return db('surveys')
    // const id = db('users').select('id').orderBy('id')
    // const arrId = id.map(id => { return id.id });
    // return await arrId.map(id => findUserDetails(id))
}

function findBy(filter) {
    return db('surveys').where(filter);
}

async function add(survey) {
    const [id] = await db('surveys').insert(survey);
    return findById(id);
}

function findById(id) {
    return db('surveys').where('id', id).select("id", "name", "type").first();
}

function findByType(type) {
    return db('surveys').where('type', type).select("id", "name", "type");
}

function findSurveyQuestions(id) {
    return db('surveys')
        .where('id', id)
        .select("id", "name", "type")
        .first()
        .then(survey => {
            return db('survey_questions as sq')
                .where('sq.survey_id', survey.id)
                .join('questions as q', 'q.id', 'sq.question_id')
                .select('q.question')
                .then(sq => {
                    return {
                        ...survey,
                        sq
                    }
                })
        })
}

function update(id, changes) {
    return db('surveys')
        .where('id', id)
        .update(changes, 'id')
        .then(() => {
            return findById(id);
        });

}

function remove(id) {
    return db('surveys').where('id', id).del()
}