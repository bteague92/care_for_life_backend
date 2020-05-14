const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findIndividualDetails,
    findByFamilyId
};

async function find() {
    return db('individuals as i')
        .join('families as f', 'f.id', 'i.family_id')
        .select('i.id', 'i.name', 'i.gender', 'i.age', 'i.family_id', 'f.name as family_name')
}

function findBy(filter) {
    return db('individuals').where(filter);
}

async function add(individual) {
    const [id] = await db('individuals').insert(individual);
    return findById(id);
}

function findById(id) {
    return db('individuals').where('id', id).select("id", "name", "gender", 'age', 'family_id').first();
}

function findByFamilyId(id) {
    return db('individuals').where('family_id', id).select("id", "name", "gender", 'age', 'family_id');
}

function update(id, changes) {
    return db('individuals')
        .where('id', id)
        .update(changes, 'id')
        .then(() => {
            return findById(id);
        });

}

function remove(id) {
    return db('individuals').where('id', id).del()
}


async function findIndividualDetails(id) {
    const user = await findById(id)
    if (user == undefined) {
        return
    } else {
        return db('individuals')
            .where('id', id)
            .select('id', 'name', 'gender', 'age', 'family_id')
            .first()
            .then(user => {
                return db('zones as z')
                    .where('z.id', user.zone_id)
                    .select('z.id', 'z.name')
                    .then(zone_info => {
                        return {
                            ...users,
                            zone_info
                        }

                    })
            })
    }
}