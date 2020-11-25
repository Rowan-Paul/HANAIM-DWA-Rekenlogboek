const mongoose = require('mongoose')

const templatesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	group: {
		type: Number,
		required: true
	},
	columns: [
		{
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
			}
		}
	]
})

mongoose.model('Templates', templatesSchema)
