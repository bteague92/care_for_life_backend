const router = require('express').Router();

const Roles = require('./roles-model.js');

router.get('/', (req, res) => {
    Roles.find()
        .then(roles => {
            res.status(200).json(roles);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Roles.findById(id)
        .then(role => {
            res.status(200).json(role);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'could not find role' })
        })
})

router.post('/', (req, res) => {
    const role = req.body;
    Roles.add(role)
        .then(role => {
            res.status(200).json(role);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'could not add role' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (id && changes) {
        Roles.update(id, changes)
            .then(role => {
                res.status(201).json(role);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Could not update role' });
            })
    } else {
        res.status(400).json({ message: 'Nothing was update for the role' });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Roles.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'User successfully deleted' });
            } else {
                res.status(404).json({ message: 'Could not find role' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not delete role' })
        })
})

module.exports = router;