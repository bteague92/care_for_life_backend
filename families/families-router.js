const router = require('express').Router();

const Fams = require('./families-model.js');

router.get('/', (req, res) => {
    Fams.find()
        .then(fams => {
            res.status(200).json(fams);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/zone/:zoneId', (req, res) => {
    let zoneId = req.params.zoneId;
    Fams.findByZone(zoneId)
        .then(fams => {
            res.status(200).json(fams);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        Fams.findById(id)
            .then(family => {
                if (family == undefined) {
                    res.status(404).json({ message: 'could not find family' })
                }
                res.status(200).json(family);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'could not find family' })
            })
    } else {
        res.status(404).json({ message: 'No such family' });
    }
})

router.post('/', (req, res) => {
    const family = req.body;
    Fams.add(family)
        .then(family => {
            res.status(200).json(family);
        })
        .catch(err => {
            res.status(500).json({ message: 'could not add family' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (id && changes) {
        Fams.update(id, changes)
            .then(family => {
                res.status(201).json(family);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Could not update family' });
            })
    } else {
        res.status(400).json({ message: 'Nothing was update for the family' });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Fams.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'family successfully deleted' });
            } else {
                res.status(404).json({ message: 'Could not find family' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not delete family' })
        })
})

module.exports = router;