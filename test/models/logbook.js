const mongoose = require('mongoose');

const logbookSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    blok: {
        type: Number,
        required: true
    },
    groep: {
        type: Number,
        required: true
    },
    jaar: {
        type: Number,
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
            isRequired: true
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
            isRequired: true
        }
    }]
});

mongoose.model("Logbook", logbookSchema);

