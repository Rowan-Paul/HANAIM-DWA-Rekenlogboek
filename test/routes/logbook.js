'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Logbook = mongoose.model("Logbook");

router.get('/logboek/:id', (req, res) => {
    Logbook.findById(req.params.id)
        .then((response) => {
            res.send(response)
        });
});

module.exports = router;