const db = require('../database/db-config.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
	findUserDetails
};

async function find() {
	return db('users as u')
		.join('roles as r', 'r.id', 'u.role_id')
		.join('zones as z', 'z.id', 'u.zone_id')
		.select('u.id', 'u.username', 'u.zone_id', 'z.name as zone', 'u.role_id', 'r.name as role')
}

function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
	const [id] = await db('users').insert(user);
	return findById(id);
}

function findById(id) {
	return db('users').where('id', id).select("id", "username", "role_id").first();
}

function update(id, changes) {
	return db('users')
		.where('id', id)
		.update(changes, 'id')
		.then(() => {
			return findById(id);
		});

}

function remove(id) {
	return db('users').where('id', id).del()
}


async function findUserDetails(id) {
	const user = await findById(id)
	if (user == undefined) {
		return
	} else {
		return db('users')
			.where('id', id)
			.select('id', 'username', 'role', 'zone_id')
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
