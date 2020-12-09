const mongoose = require('mongoose')
require('./models/logbook')
require('./models/studentlogbook')
require('./models/templates')

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
			teacher: 'xxx',
			currentPhase: 'test',
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
					title: 'Lesofzo',
					explanation: true,
					input: {
						type: 'radiobuttons',
						options: ['sdsadasd', 'sadasdasdasd']
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb78',
					position: 2,
					title: 'Instructie nodig?',
					explanation: false,
					input: {
						type: 'checkboxes',
						options: ['sdsadasd', 'sadasdasdasd']
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
					description: 'test0000',
					imagelink: 'xxxxxxxxxxxxxx'
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb7b',
					position: 1,
					title: 'Leer 1+1',
					description: 'test1111',
					imagelink: 'xxxxxxxxxxssaasdasdaxx'
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb7c',
					position: 2,
					title: 'Leer 1*1',
					description: 'test2222',
					imagelink: 'aaaaaaa'
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
			student: 'janpiet',
			answers: [
				{
					_id: '5fbbcad37f53f84d0c6fbb86',
					goalPosition: 0,
					columnPosition: 1,
					answer: {
						inputType: 'radiobuttons',
						value: 'sdsadasd',
						explanation: 'sdsadasddsdsdsdsd'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb87',
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						inputType: 'checkboxes',
						value: 'sdsadasd'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb87',
					goalPosition: 0,
					columnPosition: 3,
					answer: {
						value: 'Happy'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb89',
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						inputType: 'radiobuttons',
						value: 'sdsadasd',
						explanation: 'sdsadasddsdsdsdsd'
					}
				},
				{
					_id: '5fbbcad37f53f84d0c6fbb90',
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						inputType: 'checkboxes',
						value: 'sdsadasd'
					}
				}
			],
			__v: 0
		},
		{
			_id: '5fc9fab35b86f4c0d8d5eaed',
			logbookID: '5fbbcad37f53f84d0c6fbb75',
			student: 'klaas',
			answer: {},
			__v: 0
		}
	])
}
