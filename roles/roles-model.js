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
    return db('roles')
    // const id = db('users').select('id').orderBy('id')
    // const arrId = id.map(id => { return id.id });
    // return await arrId.map(id => findUserDetails(id))
}

function findBy(filter) {
    return db('roles').where(filter);
}

async function add(user) {
    const [id] = await db('roles').insert(user);
    return findById(id);
}

function findById(id) {
    return db('roles').where('id', id).select("id", "name").first();
}

function update(id, changes) {
    return db('roles')
        .where('id', id)
        .update(changes, 'id')
        .then(() => {
            return findById(id);
        });

}

function remove(id) {
    return db('roles').where('id', id).del()
}