const mongoose = require('mongoose');

const templatesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: Number,
        required: true
    },
    columns: [{
        position: {
            type: Number,
            isRequired: true
        },
        title: {
            type: String,
            isRequired: true
        },
        inputType: {
            type: String,
            isRequired: true
        },
        placeholder: {
            type: String,
            isRequired: false
        }
    }],
});

mongoose.model("Templates", templatesSchema);

