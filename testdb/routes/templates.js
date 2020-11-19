'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Templates = mongoose.model("Templates");

// Get all information about one template
router.get('/templates/:templateid', (req, res) => {
    Templates.findById(req.params.templateid)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = router;