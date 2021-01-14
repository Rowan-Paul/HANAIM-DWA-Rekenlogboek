/**
 * @jest-environment node
 */

'use strict'

//  README: change db name in `app.js` to `testrekenlogbook`

const mongoose = require('mongoose')
const { default: fetch } = require('node-fetch')
require('../models/studentlogbook')
require('../models/logbook')

const Logbook = mongoose.model('Logbook')
const Studentlogbook = mongoose.model('StudentLogbook')

/**
 * Get logbookID from studentlogbook created before all tests
 */
const getTestStudentlogbook = async () => {
	const studentlogbookID = await Studentlogbook.find({
		student: 'Emma Visser'
	})
		.lean()
		.then(response => {
			return response[0]._id
		})

	return studentlogbookID
}

/**
 * Get logbookID from logbook created before all tests
 */
const getTestlogbookID = async () => {
	const logbookID = await Logbook.find({
		group: 7
	})
		.lean()
		.then(response => {
			return response[0]._id
		})

	return logbookID
}

describe('/logbook routes', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017/testrekenlogboek', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		// Create logbook for tests
		await Logbook.create({
			activeGoal: 0,
			period: 3,
			group: 7,
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
						options: ['Goed', 'Slecht'],
						type: 'radiobuttons'
					},
					explanation: false,
					position: 1,
					title: 'Hoe ging de toets?'
				},
				{
					input: {
						options: ['Ja', 'Nee'],
						type: 'radiobuttons'
					},
					explanation: false,
					position: 2,
					title: 'Heb je instructie nodig?'
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
					description: 'Bijvoorbeeld 1+1',
					imageLink: '',
					position: 0,
					title: 'Ik kan optellen'
				},
				{
					description: 'Bijvoorbeeld 6 x 9',
					imageLink: '',
					position: 1,
					title: 'Ik kan vermenigvuldigen'
				}
			]
		})
			.then(async res => {
				let logbookID = res._id

				// Create studentlogbook for tests
				await Studentlogbook.create({
					logbookID: logbookID,
					student: 'Emma Visser',
					answers: [
						{
							answer: {
								value: 'Happy'
							},
							goalPosition: 0,
							columnPosition: 3
						},
						{
							answer: {
								value: 'Goed'
							},
							goalPosition: 0,
							columnPosition: 1
						},
						{
							goalPosition: 0,
							columnPosition: 2,
							answer: {
								value: 'Nee'
							}
						}
					]
				}).catch(err => {
					console.log(err)
					throw 'Error: ' + err
				})
			})
			.catch(err => {
				console.log(err)
				throw 'Error: ' + err
			})
	})

	afterAll(async () => {
		await Studentlogbook.deleteMany({})
		await mongoose.disconnect()
	})

	/**
	 * Create a new studentlogbook
	 * and checks if the server gives back the studentlogbook
	 * @route POST /studentlogbook
	 */
	test('POST /studentlogbook - happy path', async () => {
		const body = {
			logbookID: await getTestlogbookID(),
			student: 'Emma Visser'
		}

		const test = await fetch(`http://localhost:3000/studentlogbook`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}).then(response => response.json())

		expect(test.studentlogbookID).toBeDefined()
	})

	/**
	 * Create a new studentlogbook
	 * and checks if the server gives back an error
	 * @route POST /studentlogbook
	 */
	test('POST /studentlogbook - unhappy path with no student', async () => {
		const body = {
			logbookID: await getTestlogbookID()
		}

		const test = await fetch(`http://localhost:3000/studentlogbook`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}).then(response => response.status)

		expect(test).toBe(400)
	})

	/**
	 * Updates a studentlogbook
	 * and checks if the server gives back the studentlogbook
	 * @route PUT /studentlogbook
	 */
	test('PUT /studentlogbook - happy path', async () => {
		const body = {
			logbookID: await getTestlogbookID(),
			student: 'Emma Visser'
		}

		const test = await fetch(`http://localhost:3000/studentlogbook`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}).then(response => response.json())

		expect(test.logbookID).toBeDefined()
		expect(test.student).toBeDefined()
	})

	/**
	 * Updates a studentlogbook
	 * and checks if the server gives back an error
	 * @route PUT /studentlogbook
	 */
	test('PUT /studentlogbook - unhappy path with no student', async () => {
		const body = {
			logbookID: await getTestlogbookID()
		}

		const test = await fetch(`http://localhost:3000/studentlogbook`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}).then(response => response.status)

		expect(test).toBe(400)
	})

	/**
	 * Update a studentlogbook based on id
	 * and checks if the server gives back the studentlogbook
	 * @route PUT /studentlogbook/:id
	 */
	test('PUT /studentlogbook - happy path', async () => {
		const logbookID = await getTestStudentlogbook()
		const body = {
			answers: [
				{
					answer: {
						value: 'Happy'
					},
					goalPosition: 0,
					columnPosition: 3
				},
				{
					answer: {
						value: 'Goed'
					},
					goalPosition: 0,
					columnPosition: 1
				},
				{
					goalPosition: 0,
					columnPosition: 2,
					answer: {
						value: 'Ja'
					}
				}
			]
		}

		const response = await fetch(
			'http://localhost:3000/studentlogbook/' + logbookID,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		).then(response => response.json())

		expect(response.answers[2].answer).toEqual({
			value: 'Ja'
		})
	})

	/**
	 * Updates a studentlogbook based on id
	 * and checks if the server gives back an error
	 * @route PUT /studentlogbook/:id
	 */
	test('PUT /studentlogbook/:id - unhappy path with no body', async () => {
		const logbookID = await getTestStudentlogbook()

		const response = await fetch(
			'http://localhost:3000/studentlogbook/' + logbookID,
			{
				method: 'PUT'
			}
		).then(response => response.status)

		expect(response).toBe(400)
	})
})
