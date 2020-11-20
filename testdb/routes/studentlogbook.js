'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const StudentLogbook = mongoose.model("StudentLogbook");

// Create a new studentlogbook
router.post('/studentlogbook', (req, res) => {
    StudentLogbook.create({
        logbookID: req.body.logbookID,
        student: req.body.student,
    })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

// Get all information about a specific studentlogbook
router.get('/studentlogbook/:logbookid', (req, res) => {
    StudentLogbook.findById(req.params.logbookid)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Get all answers given by the student
router.get('/studentlogbook/:logbookid/answers', (req, res) => {
    StudentLogbook.findById(req.params.logbookid).lean()
        .then((response) => {
            res.status(200).send(response.answers)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Get all answers from a student from one column
router.get('/studentlogbook/:logbookid/answers/column/:columnposition', (req, res) => {
    StudentLogbook.findById(req.params.logbookid).lean()
        .then((response) => {
            const columnanswers = response.answers.filter((object) => {
                return object.columnPosition === Number(req.params.columnposition)
            })
            res.status(200).send(columnanswers)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Get all answers from a student from one row which belongs to one goal
router.get('/studentlogbook/:logbookid/answers/goal/:goalposition', (req, res) => {
    StudentLogbook.findById(req.params.logbookid).lean()
        .then((response) => {
            const columnanswers = response.answers.filter((object) => {
                return object.goalPosition === Number(req.params.goalposition)
            })
            res.status(200).send(columnanswers)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = router;