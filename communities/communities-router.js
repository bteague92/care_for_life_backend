const router = require('express').Router();
const Comm = require('./communities-model.js');

router.get('/', (req, res) => {
    Comm.find()
        .then(communities => {
            res.status(200).json(communities);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Comm.findById(id)
        .then(community => {
            res.status(200).json(community);
        })
        .catch(err => {
            res.status(500).json({ message: 'error finding community' })
        })
})

router.post('/', (req, res) => {
    const community = req.body;
    Comm.add(community)
        .then(community => {
            res.status(200).json(community);
        })
        .catch(err => {
            res.status(500).json({ message: 'error adding community' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (id && changes) {
        Comm.update(id, changes)
            .then(community => {
                res.status(201).json(community);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Could not update community' });
            })
    } else {
        res.status(400).json({ message: 'Nothing was update for the community' });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Comm.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'Community successfully deleted' });
            } else {
                res.status(404).json({ message: 'Could not find community' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not delete community' })
        })
})

module.exports = router;