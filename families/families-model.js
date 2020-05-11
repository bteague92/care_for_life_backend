const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findByZone
};

async function find() {
    return db('families as f')
        .join('zones as z', 'z.id', 'f.zone_id')
        .select('f.id', 'f.name', 'f.zone_id', 'z.name as zone_name')
}

function findBy(filter) {
    return db('families').where(filter);
}

async function add(user) {
    const [id] = await db('families').insert(user);
    return findById(id);
}

function findByZone(zoneId) {
    return db('families').where('zone_id', zoneId).select("id", "name", "zone_id");
}

function findById(id) {
    return db('families').where('id', id).select("id", "name", "zone_id").first();
}

function update(id, changes) {
    return db('families')
        .where('id', id)
        .update(changes, 'id')
        .then(() => {
            return findById(id);
        });

}

function remove(id) {
    return db('families').where('id', id).del()
}