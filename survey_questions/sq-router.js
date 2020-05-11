const router = require('express').Router();

const SQ = require('./sq-model.js');

router.get('/', (req, res) => {
    SQ.find()
        .then(sq => {
            res.status(200).json(sq);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        SQ.findUserDetails(id)
            .then(sq => {
                res.status(200).json(sq);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'could not find survey question' })
            })
    } else {
        res.status(404).json({ message: 'Pleade provide an id' });
    }
})

router.post('/', (req, res) => {
    const sq = req.body;
    SQ.add(sq)
        .then(sq => {
            res.status(200).json(sq);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'could not add survey question' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (id && changes) {
        SQ.update(id, changes)
            .then(sq => {
                res.status(201).json(sq);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Could not update survey question' });
            })
    } else {
        res.status(400).json({ message: 'Nothing was update for the survey question' });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    SQ.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'survey question successfully deleted' });
            } else {
                res.status(404).json({ message: 'Could not find survey question' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not delete survey question' })
        })
})

module.exports = router; SQ