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
			_id: '5fbbcad37f53f84d0c6fbb75',
			period: 1,
			group: 6,
			year: '2020 - 2021',
			currentPhase: 'pretest',
			activeGoal: 1,
			columns: [
				{
					_id: '5fbbcad37f53f84d0c6fbb76',
					position: 0,
					title: 'Doelen'
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb77',
					position: 1,
					title: 'Hoe heb je de toets gemaakt?',
					explanation: false,
					input: {
						type: 'textarea'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb78',
					position: 2,
					title: 'Heb je instructie nodig?',
					explanation: true,
					input: {
						type: 'radiobuttons',
						options: ['Ja', 'Nee']
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb79',
					position: 3,
					title: 'Evaluatie'
				}
			],
			goals: [
				{
					_id: '5fbbcad37f53f84d0c6fbb7a',
					position: 0,
					title: 'Leer rekenen',
					description: 'De eerste som',
					imageLink: 'learngoalthumb1.png'
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb7b',
					position: 1,
					title: 'Leer 1+1',
					description: 'Moeilijkere som',
					imageLink: 'learngoalthumb2.png'
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb7c',
					position: 2,
					title: 'Leer 1*1',
					description: 'Moeilijke som',
					imageLink: 'learngoalthumb1.png'
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb7d',
					position: 3,
					title: 'Leer 1 * 5 + 2',
					description: 'Super moeilijke som',
					imageLink: 'learngoalthumb2.png'
				}
			],
			__v: 0
		}
	])
}

async function seedStudentLogboek() {
	await StudentLogbook.deleteMany()

	await StudentLogbook.insertMany([
		{
			_id: '5fbbcad37f53f84d0c6fbb85',
			logbookID: '5fbbcad37f53f84d0c6fbb75',
			student: 'Jan Visser',
			answers: [
				{
					_id: '5fbbcad37f53f84d0c6fbb86',
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Erg goed'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb89',
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was moeilijk'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb90',
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging snel'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb87',
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'niet nodig'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb87',
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'ik deed lang over de som'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb87',
					goalPosition: 0,
					columnPosition: 3,
					answer: {
						value: 'Happy'
					}
				}
			],
			__v: 0
		},

		{
			_id: '5fbbcad37f53f84d0c6fbb88',
			logbookID: '5fbbcad37f53f84d0c6fbb75',
			student: 'Eva de Jong',
			answers: [
				{
					_id: '5fbbcad37f53f84d0c6fbb66',
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Niet zo goed'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb61',
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was super moeilijk'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb68',
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Ik had het snel af'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb70',
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'niet nodig'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb73',
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'ik deed lang over de som'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb73',
					goalPosition: 2,
					columnPosition: 2,
					answer: {
						value: 'Nee'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb78',
					goalPosition: 0,
					columnPosition: 3,
					answer: {
						value: 'Happy'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb78',
					goalPosition: 1,
					columnPosition: 3,
					answer: {
						value: 'Sad'
					}
				}
			],
			__v: 0
		}
	])
}
