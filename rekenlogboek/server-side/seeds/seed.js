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
			_id: '5fbbcad37f53f84d0c6fbb75',
			period: 1,
			group: 6,
			year: '2020 - 2021',
			currentPhase: 'pretest',
			activeGoal: 0,
			columns: [
				{
					position: 0,
					title: 'Doelen'
				},
				{
					position: 1,
					title: 'Hoe heb je de toets gemaakt?',
					explanation: false,
					input: {
						type: 'textarea'
					}
				},
				{
					position: 2,
					title: 'Heb je instructie nodig?',
					explanation: true,
					input: {
						type: 'radiobuttons',
						options: ['Ja', 'Nee']
					}
				},
				{
					position: 3,
					title: 'Evaluatie'
				}
			],
			goals: [
				{
					position: 0,
					title: 'Leer rekenen',
					description: 'De eerste som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 1,
					title: 'Leer 1+1',
					description: 'Moeilijkere som',
					imageLink: 'temp/learngoalthumb2.png'
				},
				{
					position: 2,
					title: 'Leer 1*1',
					description: 'Moeilijke som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 3,
					title: 'Leer 1 * 5 + 2',
					description: 'Super moeilijke som',
					imageLink: 'temp/learngoalthumb2.png'
				}
			],
			__v: 0
		},
		{
			_id: '6000074d1661c725cbef9632',
			activeGoal: 0,
			period: 2,
			group: 6,
			year: '2020 - 2021',
			currentPhase: 'notVisible',
			columns: [
				{
					input: {
						options: []
					},
					position: 0,
					title: 'Doelen'
				},
				{
					input: {
						options: [],
						type: 'textarea'
					},
					position: 1,
					title: 'Hoe heb je de toets gemaakt?',
					explanation: false
				},
				{
					input: {
						options: ['Ja', 'Nee'],
						type: 'radiobuttons'
					},
					position: 2,
					title: 'Heb je instructie nodig?',
					explanation: true
				},
				{
					input: {
						options: []
					},
					position: 3,
					title: 'Evaluatie'
				}
			],
			goals: [
				{
					position: 0,
					title: 'Leer rekenen',
					description: 'De eerste som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 1,
					title: 'Leer 1+1',
					description: 'Moeilijkere som',
					imageLink: 'temp/learngoalthumb2.png'
				},
				{
					position: 2,
					title: 'Leer 1*1',
					description: 'Moeilijke som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 3,
					title: 'Leer 1 * 5 + 2',
					description: 'Super moeilijke som',
					imageLink: 'temp/learngoalthumb2.png'
				}
			],
			__v: 0
		},
		{
			_id: '600001c81661c725cbef79fe',
			period: 1,
			group: 5,
			year: '2020 - 2021',
			currentPhase: 'pretest',
			activeGoal: 1,
			columns: [
				{
					position: 0,
					title: 'Doelen'
				},
				{
					position: 1,
					title: 'Hoe heb je de toets gemaakt?',
					explanation: false,
					input: {
						type: 'textarea'
					}
				},
				{
					position: 2,
					title: 'Denk je dat je instructie nodig hebt?',
					explanation: true,
					input: {
						type: 'radiobuttons',
						options: ['Ja', 'Nee']
					}
				},
				{
					position: 3,
					title: 'Evaluatie'
				}
			],
			goals: [
				{
					position: 0,
					title: 'Leer rekenen',
					description: 'De eerste som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 1,
					title: 'Leer 1+1',
					description: 'Moeilijkere som',
					imageLink: 'temp/learngoalthumb2.png'
				},
				{
					position: 2,
					title: 'Leer 1*1',
					description: 'Moeilijke som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 3,
					title: 'Leer 1 * 5 + 2',
					description: 'Super moeilijke som',
					imageLink: 'temp/learngoalthumb2.png'
				}
			],
			__v: 0
		},
		{
			_id: '600002181661c725cbef7b31',
			period: 1,
			group: 7,
			year: '2020 - 2021',
			currentPhase: 'pretest',
			activeGoal: 0,
			columns: [
				{
					position: 0,
					title: 'Doelen'
				},
				{
					position: 1,
					title: 'Hoe heb je de toets gemaakt?',
					explanation: false,
					input: {
						type: 'textarea'
					}
				},
				{
					position: 2,
					title: 'Denk je dat je instructie nodig hebt?',
					explanation: true,
					input: {
						type: 'radiobuttons',
						options: ['Ja', 'Nee']
					}
				},
				{
					position: 3,
					title: 'Evaluatie'
				}
			],
			goals: [
				{
					position: 0,
					title: 'Leer rekenen',
					description: 'De eerste som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 1,
					title: 'Leer 1+1',
					description: 'Moeilijkere som',
					imageLink: 'temp/learngoalthumb2.png'
				},
				{
					position: 2,
					title: 'Leer 1*1',
					description: 'Moeilijke som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 3,
					title: 'Leer 1 * 5 + 2',
					description: 'Super moeilijke som',
					imageLink: 'temp/learngoalthumb2.png'
				}
			],
			__v: 0
		},
		{
			_id: '600002381661c725cbef7b41',
			period: 1,
			group: 8,
			year: '2020 - 2021',
			currentPhase: 'pretest',
			activeGoal: 0,
			columns: [
				{
					position: 0,
					title: 'Doelen'
				},
				{
					position: 1,
					title: 'Hoe heb je de toets gemaakt?',
					explanation: false,
					input: {
						type: 'textarea'
					}
				},
				{
					position: 2,
					title: 'Denk je dat je instructie nodig hebt?',
					explanation: true,
					input: {
						type: 'radiobuttons',
						options: ['Ja', 'Nee']
					}
				},
				{
					position: 3,
					title: 'Evaluatie'
				}
			],
			goals: [
				{
					position: 0,
					title: 'Leer rekenen',
					description: 'De eerste som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 1,
					title: 'Leer 1+1',
					description: 'Moeilijkere som',
					imageLink: 'temp/learngoalthumb2.png'
				},
				{
					position: 2,
					title: 'Leer 1*1',
					description: 'Moeilijke som',
					imageLink: 'temp/learngoalthumb1.png'
				},
				{
					position: 3,
					title: 'Leer 1 * 5 + 2',
					description: 'Super moeilijke som',
					imageLink: 'temp/learngoalthumb2.png'
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
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Erg goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was moeilijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging snel'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'niet nodig'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'ik deed lang over de som'
					}
				},
				{
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
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Niet zo goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was super moeilijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Ik had het snel af'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'niet nodig'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'ik deed lang over de som'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 2,
					answer: {
						value: 'Nee'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 3,
					answer: {
						value: 'Happy'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 3,
					answer: {
						value: 'Sad'
					}
				}
			],
			__v: 0
		},
		{
			_id: '6000032f1661c725cbef8133',
			logbookID: '600001c81661c725cbef79fe',
			student: 'Piet Koning',
			answers: [
				{
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Erg goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was moeilijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging langzaam'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'niet nodig'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'ik deed lang over de som'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 3,
					answer: {
						value: 'Sad'
					}
				}
			],
			__v: 0
		},
		{
			_id: '6000037d1661c725cbef826f',
			logbookID: '600001c81661c725cbef79fe',
			student: 'Kees Jansen',
			answers: [
				{
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Erg goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was moeilijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging snel'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'niet nodig'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'ik deed lang over de som'
					}
				},
				{
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
			_id: '600004341661c725cbef860d',
			logbookID: '600002181661c725cbef7b31',
			student: 'Danny de Boer',
			answers: [
				{
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Niet goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was moeilijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging snel'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'De som ging slecht'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'ik deed lang over de som'
					}
				},
				{
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
			_id: '600004871661c725cbef8751',
			logbookID: '600002181661c725cbef7b31',
			student: 'Evalien Jansma',
			answers: [
				{
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Niet goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was makkelijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging snel'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'De som ging slecht'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'Snelle som'
					}
				},
				{
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
			_id: '600004ec1661c725cbef89bb',
			logbookID: '600002381661c725cbef7b41',
			student: 'Kevin Postma',
			answers: [
				{
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Niet goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was makkelijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging snel'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Ja',
						explanation: 'De som ging slecht'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'Snelle som'
					}
				},
				{
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
			_id: '600005361661c725cbef8b01',
			logbookID: '600002381661c725cbef7b41',
			student: 'Linda Poraya',
			answers: [
				{
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						value: 'Ging erg goed'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						value: 'De som was makkelijk'
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						value: 'Deze opdracht ging snel'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'Ging snel door de som'
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						value: 'Nee',
						explanation: 'Snelle som'
					}
				},
				{
					goalPosition: 0,
					columnPosition: 3,
					answer: {
						value: 'Happy'
					}
				}
			],
			__v: 0
		}
	])
}

console.log(`seed installed`)
