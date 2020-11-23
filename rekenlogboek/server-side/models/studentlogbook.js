const mongoose = require('mongoose');

const studentLogbookSchema = new mongoose.Schema({
    logbookID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    answers: [{
        goalPosition: {
            type: Number,
            isRequired: true
        },
        columnPosition: {
            type: Number,
            isRequired: true
        },
        answer: {
            inputType: {
                type: String,
                isRequired: true
            },
            value: {
                type: String,
                isRequired: true
            },
            boolean: {
                type: Boolean,
                isRequired: false
            }
        },
    }],
});

mongoose.model("StudentLogbook", studentLogbookSchema);

