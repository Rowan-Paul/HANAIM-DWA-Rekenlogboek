const mongoose = require('mongoose')
require('../models/logbook')
require('../models/studentlogbook')

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
			currentPhase: 'notVisible',
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
					explanation: false,
					position: 1,
					title: 'Hoe heb je de toets gemaakt?'
				},
				{
					input: {
						options: [
							'Ik heb instructie nodig',
							'Ik heb geen instructie nodig'
						],
						type: 'radiobuttons'
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

	const logbook = await Logbook.find({}).limit(1)

	await StudentLogbook.insertMany([
		{
			_id: '5ff72861b51be5f097228b39',
			logbookID: '5ff7197fc149682931090ec8',
			student: 'Lieke de Boer',
			answers: [
				{
					_id: '5ff72db7af635e573c0b1baf',
					answer: {
						value: 'Ik snap het goed'
					},
					goalPosition: 1,
					columnPosition: 1
				},
				{
					_id: '5ff72dd3af635e573c0b1bb1',
					answer: {
						value: 'Ik snap het niet'
					},
					goalPosition: 0,
					columnPosition: 1
				},
				{
					_id: '5ffc40be539c93638788c8c6',
					answer: {
						value: 'Sad'
					},
					goalPosition: 0,
					columnPosition: 3
				}
			],
			__v: 0
		}
	])
}

console.log('Finished')
