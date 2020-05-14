const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret.js');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
	let user = req.body;
	bcrypt.genSalt(13, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) {
				res.status(500).json({ message: 'error with hash' })
			} else {
				user.password = hash;
				Users.add(user)
					.then(usr => {
						res.status(201).json(usr);
					})
					.catch(err => {
						res.status(400).json({ message: `${err}` });
					})
			}
		});
	});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user) {
				bcrypt.compare(password, user.password).then(match => {
					if (match) {
						const token = signToken(user);
						res.status(200).json({ token: token, id: user.id, zone_id: user.zone_id, role_id: user.role_id });
					} else {
						res.status(401).json({ message: 'Invalid Credentials' });
					}
				})
					.catch(err => {
						res.status(500).json({ message: `${err}` });
					})
			} else {
				res.status(400).json({ message: 'Not an existing user' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Invalid Credentials' });
		});
});

function signToken(user) {
	const payload = {
		id: user.id
	};
	const options = {
		expiresIn: '8h'
	};
	return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;