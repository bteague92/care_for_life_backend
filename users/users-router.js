const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(401).send(err);
		})
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	if (id) {
		Users.findUserDetails(id)
			.then(user => {
				if (user == undefined) {
					res.status(404).json({ message: 'could not find user' })
				}
				res.status(200).json(user);
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({ message: 'could not find user' })
			})
	} else {
		res.status(404).json({ message: 'No such user' });
	}
})

router.put('/:id', (req, res) => {
	const id = req.params.id
	const changes = req.body;
	if (id && changes) {
		Users.update(id, changes)
			.then(user => {
				res.status(201).json(user);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ message: 'Could not update user' });
			})
	} else {
		res.status(400).json({ message: 'Nothing was update for the user' });
	}
})

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Users.remove(id)
		.then(removed => {
			if (removed) {
				res.status(200).json({ message: 'User successfully deleted' });
			} else {
				res.status(404).json({ message: 'Could not find user' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Could not delete user' })
		})
})

module.exports = router;