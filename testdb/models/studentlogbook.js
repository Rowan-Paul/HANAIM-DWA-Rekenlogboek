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
        goalID: {
            type: Number,
            isRequired: true
        },
        columnID: {
            type: Number,
            isRequired: true
        },
        answer: {
            type: String,
            isRequired: true
        },
        instructionNeeded: {
            type: Boolean,
            isRequired: true
        }
    }],
});

mongoose.model("StudentLogbook", studentLogbookSchema);

