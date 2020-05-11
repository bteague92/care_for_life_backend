const router = require('express').Router();

const Zones = require('./zones-model.js');

router.get('/', (req, res) => {
    Zones.find()
        .then(zones => {
            res.status(200).json(zones);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Zones.findById(id)
        .then(user => {
            if (user == undefined) {
                res.status(404).json({ message: 'could not find zone' })
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'could not find zone' })
        })
})

router.get('/comm/:id', (req, res) => {
    const id = req.params.id;
    Zones.findByCommId(id)
        .then(zones => {
            res.status(200).json(zones);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'could not find zones' })
        })
})

router.post('/', (req, res) => {
    const zone = req.body;
    Zones.add(zone)
        .then(zone => {
            res.status(200).json(zone);
        })
        .catch(err => {
            res.status(500).json({ message: 'could not add zone' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (id && changes) {
        Zones.update(id, changes)
            .then(zone => {
                res.status(201).json(zone);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Could not update zone' });
            })
    } else {
        res.status(400).json({ message: 'Nothing was update for the zone' });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Zones.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'zone successfully deleted' });
            } else {
                res.status(404).json({ message: 'Could not find zone' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not delete zone' })
        })
})

module.exports = router;