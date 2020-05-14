const router = require('express').Router();

const Individuals = require('./individuals-model.js');

router.get('/', (req, res) => {
    Individuals.find()
        .then(individuals => {
            res.status(200).json(individuals);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        Individuals.findById(id)
            .then(individual => {
                if (individual == undefined) {
                    res.status(404).json({ message: 'could not find individual' })
                }
                res.status(200).json(individual);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'could not find individual' })
            })
    } else {
        res.status(404).json({ message: 'No such individual' });
    }
})

router.get('/family/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        Individuals.findByFamilyId(id)
            .then(individuals => {
                if (individuals == undefined) {
                    res.status(404).json({ message: 'could not find individuals' })
                }
                res.status(200).json(individuals);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'could not find individuals' })
            })
    } else {
        res.status(404).json({ message: 'No such individuals' });
    }
})

router.post('/', (req, res) => {
    const individual = req.body;
    Individuals.add(individual)
        .then(individual => {
            res.status(200).json(individual);
        })
        .catch(err => {
            res.status(500).json({ message: 'could not add individual' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (id && changes) {
        Individuals.update(id, changes)
            .then(individual => {
                res.status(201).json(individual);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Could not update individual' });
            })
    } else {
        res.status(400).json({ message: 'Nothing was update for the individual' });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Individuals.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'individual successfully deleted' });
            } else {
                res.status(404).json({ message: 'Could not find individual' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not delete individual' })
        })
})

module.exports = router;