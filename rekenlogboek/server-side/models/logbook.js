const mongoose = require('mongoose')

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
			input: {
				type: {
					type: String,
					isRequired: true
				},
				options: [
					{
						type: String,
						isRequired: false
					}
				]
			}
		}
	],
	goals: [
		{
			position: {
				type: Number,
				isRequired: true
			},
			title: {
				type: String,
				isRequired: true
			},
			description: {
				type: String,
				isRequired: true
			},
			imagelink: {
				type: String,
				isRequired: false
			}
		}
	]
})

mongoose.model('Logbook', logbookSchema)
