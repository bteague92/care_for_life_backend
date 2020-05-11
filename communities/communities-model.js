const db = require('../database/db-config.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
	findCommunityDetails
};

async function find() {
	return db('communities')
}

function findBy(filter) {
	return db('communities').where(filter);
}

async function add(community) {
	const [id] = await db('communities').insert(community);
	return findById(id);
}

function findById(id) {
	return db('communities').where('id', id).select("id", "name").first();
}

function update(id, changes) {
	return db('communities')
		.where('id', id)
		.update(changes, 'id')
		.then(() => {
			return findById(id);
		});

}

function remove(id) {
	return db('communities').where('id', id).del()
}


async function findCommunityDetails(id) {
	const user = await findById(id)
	if (user == undefined) {
		return
	} else {
		return db('communities as c')
			.where('c.id', id)
			.select('c.id', 'c.name')
			.first()
			.then(community => {
				return db('zones as z')
					.where('z.community_id', community.id)
					.select('z.id', 'z.name')
					.then(zone_info => {
						return db('families as f')
							.where('f.zone_id', zone_info.id)
							.select('f.name')
							.then(family_info => {
								return {
									...community,
									...zone_info,
									...family_info
								}
							})
					})
			})
	}
}
