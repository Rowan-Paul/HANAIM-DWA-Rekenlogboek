/**
 * @jest-environment node
 */

'use strict'

//  README: change db name in `app.js` to `testrekenlogbook`

const mongoose = require('mongoose')
const { default: fetch } = require('node-fetch')
require('../models/studentlogbook')

const Studentlogbook = mongoose.model('StudentLogbook')

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
		await Studentlogbook.create({
			logbookID: '5ffec7c216a01e43606cfb2a',
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
			logbookID: '5fbf66ca14b7c811a829fada',
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
			logbookID: '5fbf66ca14b7c811a829fada'
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
			logbookID: '5fbf66ca14b7c811a829fada',
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
			logbookID: '5fbf66ca14b7c811a829fada'
		}

		const test = await fetch(`http://localhost:3000/studentlogbook`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}).then(response => response.status)

		expect(test).toBe(400)
	})
})
