'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

require("./models/logbook")
require("./models/studentlogbook")
require("./models/templates")

const logbookRouter = require('./routes/logbook');
const studentlogbookRouter = require('./routes/studentlogbook');
const templatesRouter = require('./routes/templates')

const dbName = 'testdbproject';

const app = express();

app.use(bodyParser.json());

app.use('/', logbookRouter);
app.use('/', studentlogbookRouter)
app.use('/', templatesRouter)

const server = app.listen(3000, () => {
    mongoose.connect(`mongodb://localhost:27017/${dbName}`,  {useNewUrlParser: true }, () => {
        console.log(`server started on port ${server.address().port}`);
    });
});