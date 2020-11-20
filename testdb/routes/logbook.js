'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Logbook = mongoose.model("Logbook");

// Create a new logbook
router.post('/logbook', (req, res) => {
    Logbook.create({
        period: req.body.period,
        group: req.body.group,
        year: req.body.year,
        teacher: req.body.teacher,
        isAvailable: req.body.isAvailable,
    })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

// Get all information about one logbook
router.get('/logbook/:id', (req, res) => {
    Logbook.findById(req.params.id)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Get the id, position, title, inputType and placeholder for one column from a specific logbook
router.get('/logbook/:id/column/:position', (req, res) => {
    Logbook.findById(req.params.id).lean()
        .then((response) => {
            const column = response.columns.find((object) => {
                return object.position === Number(req.params.position)
            })
            res.status(200).send(column)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Get the id, position, title, description and imagelink for one goal for one logbook
router.get('/logbook/:id/goal/:position', (req, res) => {
    Logbook.findById(req.params.id).lean()
        .then((response) => {
            const goal = response.goals.find((object) => {
                return object.position === Number(req.params.position)
            })
            res.status(200).send(goal)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = router;