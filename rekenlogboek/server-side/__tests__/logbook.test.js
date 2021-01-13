/**
 * @jest-environment node
 */

'use strict'

//  README: change db name in `app.js` to `testrekenlogbook`

const mongoose = require('mongoose')
const { default: fetch } = require('node-fetch')
require('../models/logbook')

const Logbook = mongoose.model('Logbook')

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
	})

	afterAll(async () => {
		await Logbook.deleteMany({})
		await mongoose.disconnect()
	})

	/**
	 * Makes new logbook and checks if
	 * the server gives back status 200
	 * @route POST /logbook
	 */
	test('POST /logbook - happy path', async () => {
		const createResponse = await fetch('http://localhost:3000/logbook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				activeGoal: 0,
				period: 1,
				group: 5,
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
							options: ['Ja', 'Nee'],
							type: 'radiobuttons'
						},
						explanation: false,
						position: 1,
						title: 'Snap je de toets?'
					},
					{
						input: {
							options: ['Zeker', 'Misschien', 'Nee'],
							type: 'radiobuttons'
						},
						explanation: false,
						position: 2,
						title: 'Heb je help nodig?'
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
						description: 'Bijvoorbeeld 3 + 9',
						imageLink: '',
						position: 0,
						title: 'Ik kan optellen'
					},
					{
						description: 'Bijvoorbeeld 3 x 4',
						imageLink: '',
						position: 1,
						title: 'Ik kan vermenigvuldigen'
					}
				]
			})
		}).then(response => response.status)

		expect(createResponse).toEqual(200)
	})

	/**
	 * Makes a new logbook with missing variables
	 * and checks if the server gives back status 500
	 * @route POST /logbook
	 */
	test('POST /logbook - unhappy path with missing variables', async () => {
		const createResponse = await fetch('http://localhost:3000/logbook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				group: 5,
				year: '2020 - 2021',
				currentPhase: 'notVisible',
				columns: [
					{
						position: 0,
						title: 'Doelen'
					},
					{
						explanation: false,
						position: 1,
						title: 'Snap je de toets?'
					},
					{
						input: {
							options: ['Zeker', 'Misschien', 'Nee'],
							type: 'radiobuttons'
						},
						explanation: false,
						position: 2,
						title: 'Heb je help nodig?'
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
						description: 'Bijvoorbeeld 3 + 9',
						imageLink: '',
						position: 0,
						title: 'Ik kan optellen'
					},
					{
						description: 'Bijvoorbeeld 3 x 4',
						imageLink: '',
						position: 1,
						title: 'Ik kan vermenigvuldigen'
					}
				]
			})
		}).then(response => response.status)

		expect(createResponse).toEqual(500)
	})

	/**
	 * Update a logbook's currentPhase
	 * and checks if the server gives back status 200
	 * @route PUT /:id/currentPhase
	 */
	test('PUT /logbook/:id/currentPhase - happy path', async () => {
		const body = {
			currentPhase: 'evaluation'
		}

		const logbookID = await getTestlogbookID()
		const test = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/currentPhase',
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		).then(response => response.status)

		expect(test).toEqual(200)
	})

	/**
	 * Update a logbook's currentPhase
	 * and checks if the server gives back status 200
	 * @route PUT /:id/currentPhase
	 */
	test('PUT /logbook/:id/currentPhase - unhappy path with wrong body', async () => {
		const body = {
			currentPhase: 'judyisbae'
		}

		const logbookID = await getTestlogbookID()
		const test = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/currentPhase',
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		).then(response => response.status)

		expect(test).toEqual(400)
	})

	/**
	 * Get the active logbook for a certain group
	 * and checks if the server gives back the correct logbook
	 * @route GET /logbook/groups/:group
	 */
	test('GET /logbook/groups/:group - happy path', async () => {
		const group = 7
		const test = await fetch('http://localhost:3000/logbook/groups/' + group, {
			method: 'GET'
		}).then(response => response.json())

		expect(test.year).toEqual('2020 - 2021')
		expect(test.period).toEqual(3)
	})

	/**
	 * Get the active logbook for a certain group
	 * and checks if the server gives back an error
	 * @route GET /logbook/groups/:group
	 */
	test('GET /logbook/groups/:group - unhappy path with wrong group', async () => {
		const group = 6
		const test = await fetch('http://localhost:3000/logbook/groups/' + group, {
			method: 'GET'
		})

		expect(test.status).toEqual(404)
	})

	/**
	 * Update a logbook's currentGoal
	 * and checks if the server gives back the correct logbook
	 * @route PUT /logbook/:id/activeGoal
	 */
	test('PUT /logbook/:id/activeGoal - happy path', async () => {
		const body = {
			activeGoal: 69
		}

		const logbookID = await getTestlogbookID()
		const test = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/activeGoal',
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		).then(response => response.status)

		expect(test).toEqual(200)
	})

	/**
	 * Update a logbook's currentGoal
	 * and checks if the server gives back an error
	 * @route PUT /logbook/:id/activeGoal
	 */
	test('PUT /logbook/:id/activeGoal - unhappy path with wrong body', async () => {
		const body = {
			activeGoal: 'astring'
		}

		const logbookID = await getTestlogbookID()
		const test = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/activeGoal',
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}
		).then(response => response.status)

		expect(test).toEqual(400)
	})

	/**
	 * Get all information about one logbook with specifications
	 * and checks if the server gives back the correct logbook
	 * @route GET /logbook/years/:year/groups/:group/periods/:period
	 */
	test('GET /logbook/years/:year/groups/:group/periods/:period - happy path', async () => {
		const year = '2020 - 2021'
		const group = 7
		const period = 3

		const test = await fetch(
			`http://localhost:3000/logbook/years/${year}/groups/${group}/periods/${period}`,
			{
				method: 'GET'
			}
		).then(response => response.json())

		expect(test.year).toEqual('2020 - 2021')
		expect(test.period).toEqual(3)
	})

	/**
	 * Get all information about one logbook with specifications
	 * and checks if the server gives back the correct logbook
	 * @route GET /logbook/years/:year/groups/:group/periods/:period
	 */
	test('GET /logbook/years/:year/groups/:group/periods/:period - unhappy path with wrong group', async () => {
		const year = '2020 - 2021'
		const group = 6
		const period = 3

		const test = await fetch(
			`http://localhost:3000/logbook/years/${year}/groups/${group}/periods/${period}`,
			{
				method: 'GET'
			}
		).then(response => response.status)

		expect(test).toEqual(500)
	})
})
