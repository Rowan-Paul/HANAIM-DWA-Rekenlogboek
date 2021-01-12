const mongoose = require('mongoose')
require('./models/logbook')
require('./models/studentlogbook')

const dbName = 'rekenlogboek'

const db = mongoose.connection

const Logbook = mongoose.model('Logbook')
const StudentLogbook = mongoose.model('StudentLogbook')

mongoose
	.connect(`mongodb://localhost:27017/${dbName}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		return seedLogbook()
	})
	.then(() => {
		return seedStudentLogboek()
	})
	.catch(err => {
		console.log(err)
	})
	.then(() => {
		db.close()
	})

async function seedLogbook() {
	await Logbook.deleteMany()

	await Logbook.insertMany([
		{
			_id: '5ff7197fc149682931090ec8',
			activeGoal: 0,
			period: 1,
			group: 6,
			year: '2020 - 2021',
			currentPhase: 'pretest',
			columns: [
				{
					input: {
						options: []
					},
					_id: '5ff7197fc149682931090ec9',
					position: 0,
					title: 'Doelen'
				},
				{
					input: {
						options: ['Ik snap het goed', 'Ik snap het niet'],
						type: 'radiobuttons'
					},
					_id: '5ff7197fc149682931090eca',
					explanation: true,
					position: 1,
					title: 'Hoe heb je de toets gemaakt?'
				},
				{
					input: {
						options: [
							'Ik heb instructie nodig',
							'Ik heb geen instructie nodig'
						],
						type: 'checkboxes'
					},
					_id: '5ff7197fc149682931090ecb',
					explanation: false,
					position: 2,
					title: 'Heb je instructie nodig?'
				},
				{
					input: {
						options: []
					},
					_id: '5ff7197fc149682931090ecc',
					position: 3,
					title: 'Evaluatie'
				}
			],
			goals: [
				{
					_id: '5ff7197fc149682931090ecd',
					description: 'Omschrijving.',
					imageLink: '1610029433492_temp-goal-thumb.png',
					position: 0,
					title: 'Doel 1'
				},
				{
					_id: '5ff7197fc149682931090ece',
					description: 'Omschrijving.',
					imageLink: '1610029439214_learngoalthumb.png',
					position: 1,
					title: 'Doel 2'
				}
			],
			__v: 0
		}
	])
}

async function seedStudentLogboek() {
	await StudentLogbook.deleteMany()
}
