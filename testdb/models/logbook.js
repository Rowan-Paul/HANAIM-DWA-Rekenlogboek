const mongoose = require('mongoose');

const logbookSchema = new mongoose.Schema({
    period: {
        type: Number,
        required: true
    },
    group: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    columns: [{
        _id: {
            type: Number,
            isRequired: true
        },
        name: {
            type: String,
            isRequired: true
        },
        placeholder: {
            type: String,
            isRequired: false
        }
    }],
    goals: [{
        _id: {
            type: Number,
            isRequired: true
        },
        goal: {
            type: String,
            isRequired: true
        },
        imagelink: {
            type: String,
            isRequired: false
        }
    }]
});

mongoose.model("Logbook", logbookSchema);

