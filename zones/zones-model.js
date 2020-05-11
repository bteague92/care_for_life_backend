const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findByCommId
};

async function find() {
    return db('zones as z')
        .join('communities as c', 'c.id', 'z.community_id')
        .select('z.id', 'z.name', 'z.community_id', 'c.name as community_name')
}

function findBy(filter) {
    return db('zones').where(filter);
}

async function add(zone) {
    const [id] = await db('zones').insert(zone);
    return findById(id);
}

function findById(id) {
    return db('zones').where('id', id).select("id", "name").first();
}

function findByCommId(id) {
    return db('zones').where('Community_id', id).select("id", "name");
}

function update(id, changes) {
    return db('zones')
        .where('id', id)
        .update(changes, 'id')
        .then(() => {
            return findById(id);
        });

}

function remove(id) {
    return db('zones').where('id', id).del()
}
