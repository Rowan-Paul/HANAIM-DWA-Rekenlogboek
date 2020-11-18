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
router.get('/logbook/:logbookid', (req, res) => {
    Logbook.findById(req.params.logbookid)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Get the id, name and placeholder for one column from a specific logbook
router.get('/logbook/:logbookid/column/:columnid', (req, res) => {
    Logbook.findById(req.params.logbookid).lean()
        .then((response) => {
            const column = response.columns.find((object) => {
                return object._id === Number(req.params.columnid)
            })
            res.status(200).send(column)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Get the id, goal and imagelink for one goal for one logbook
router.get('/logbook/:logbookid/goal/:goalid', (req, res) => {
    Logbook.findById(req.params.logbookid).lean()
        .then((response) => {
            const goal = response.goals.find((object) => {
                return object._id === Number(req.params.goalid)
            })
            res.status(200).send(goal)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = router;