'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Logbook = mongoose.model("Logbook");

router.get('/logboek/:id', (req, res) => {
    Logbook.findById(req.params.id)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});


router.post('/logboek', (req, res) => {

    // Logbook.find({}).then((response) => {
    //     console.log(Math.max(...array1));
    //     console.log(response)
    // })

    Logbook.create({
        _id: req.body._id,
        period: req.body.period,
        group: req.body.group,
        year: req.body.year,
        teacher: req.body.teacher,
        isAvailable: false,
    })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
            throw err;
        });
});

module.exports = router;