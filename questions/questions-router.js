const router = require('express').Router();

const Questions = require('./questions-model.js');

router.get('/', (req, res) => {
    Questions.find()
        .then(questions => {
            res.status(200).json(questions);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        Questions.findById(id)
            .then(question => {
                res.status(200).json(question);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'could not find question' })
            })
    } else {
        res.status(404).json({ message: 'No such question' });
    }
})

router.post('/', (req, res) => {
    const question = req.body;
    if (question) {
        Questions.add(question)
            .then(question => {
                res.status(200).json(question);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'could not add question' })
            })
    } else {
        res.status(404).json({ message: 'Required fields not provided' });
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (id && changes) {
        Questions.update(id, changes)
            .then(question => {
                res.status(201).json(question);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Could not update question' });
            })
    } else {
        res.status(400).json({ message: 'Nothing was update for the question' });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Questions.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'Question successfully deleted' });
            } else {
                res.status(404).json({ message: 'Could not find question' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not delete question' })
        })
})

module.exports = router;