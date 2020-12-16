/**
 * @jest-environment node
 */

'use strict'

const mongoose = require('mongoose')
const { default: fetch } = require('node-fetch')
require('../models/logbook')

const Logbook = mongoose.model('Logbook')

// Get logbookID from logbook created before all tests
const getTestlogbookID = async () => {
	const number = await Logbook.find({
		group: 7
	})
		.lean()
		.then(response => {
			return response[0]._id
		})

	return number
}

describe('Logbook route tests', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017/testrekenlogboek', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		// Create logbook for tests
		await Logbook.create({
			period: 3,
			group: 7,
			year: '2019 - 2020',
			currentPhase: 'PRE_TOETS',
			columns: [
				{
					position: 0,
					title: 'Doelen'
				},
				{
					position: 1,
					title: 'Hoe ging de les',
					input: {
						type: 'Radiobuttons',
						options: [
							'Ik begrijp het goed',
							'Ik begrijp het niet goed',
							'Ik weet het nog niet'
						]
					},
					explanation: true
				},
				{
					position: 2,
					title: 'Instructie nodig?',
					input: {
						type: 'Tekstveld'
					},
					explanation: true
				},
				{
					position: 3,
					title: 'Evaluatie',
					explanation: false
				}
			],
			goals: [
				{
					position: 0,
					title: 'Les 1',
					description: 'In deze les leer je 1+1',
					imagelink: 'xxx'
				},
				{
					position: 1,
					title: 'Les 2',
					description: 'In deze les leer je 2*2',
					imagelink: 'xxx'
				},
				{
					position: 2,
					title: 'Les 3',
					description: 'In deze les leer je 5*5',
					imagelink: 'xxx'
				}
			]
		})
	})

	afterAll(async () => {
		await Logbook.deleteMany({
			group: 7
		})
		await Logbook.deleteMany({
			group: 5
		})
		await mongoose.disconnect()
	})

	test('Create logbook', async () => {
		const createResponse = await fetch('http://localhost:3000/logbook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				period: 1,
				group: 5,
				year: '2019 - 2020',
				currentPhase: 'NOT_VISIBLE',
				columns: [
					{
						position: 0,
						title: 'Doelen'
					},
					{
						position: 1,
						title: 'Hoe ging de les',
						input: {
							type: 'Radiobuttons',
							options: [
								'Ik begrijp het goed',
								'Ik begrijp het niet goed',
								'Ik weet het nog niet'
							]
						},
						explanation: true
					},
					{
						position: 2,
						title: 'Instructie nodig',
						input: {
							type: 'Tekstveld'
						},
						explanation: false
					},
					{
						position: 3,
						title: 'Evaluatie',
						explanation: false
					}
				],
				goals: [
					{
						position: 0,
						title: 'Les 1',
						description: 'In deze les leer je 1+1',
						imagelink: 'xxx'
					},
					{
						position: 1,
						title: 'Les 2',
						description: 'In deze les leer je 2*2',
						imagelink: 'xxx'
					},
					{
						position: 2,
						title: 'Les 3',
						description: 'In deze les leer je 5*5',
						imagelink: 'xxx'
					}
				]
			})
		}).then(response => response.status)

		expect(createResponse).toEqual(200)
	})

	test('Create logbook with missing variable returns error code', async () => {
		const createResponse = await fetch('http://localhost:3000/logbook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				group: 5,
				year: '2019 - 2020',
				currentPhase: 'NOT_VISIBLE',
				columns: [
					{
						position: 0,
						title: 'Doelen'
					},
					{
						position: 1,
						title: 'Hoe ging de les',
						input: {
							type: 'Radiobuttons',
							options: [
								'Ik begrijp het goed',
								'Ik begrijp het niet goed',
								'Ik weet het nog niet'
							]
						},
						explanation: true
					},
					{
						position: 2,
						title: 'Instructie nodig',
						input: {
							type: 'Tekstveld'
						},
						explanation: true
					},
					{
						position: 3,
						title: 'Evaluatie',
						explanation: false
					}
				],
				goals: [
					{
						position: 0,
						title: 'Les 1',
						description: 'In deze les leer je 1+1',
						imagelink: 'xxx'
					},
					{
						position: 1,
						title: 'Les 2',
						description: 'In deze les leer je 2*2',
						imagelink: 'xxx'
					},
					{
						position: 2,
						title: 'Les 3',
						description: 'In deze les leer je 5*5',
						imagelink: 'xxx'
					}
				]
			})
		}).then(response => response.status)

		expect(createResponse).toEqual(500)
	})

	test('Update currentPhase', async () => {
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

	test('Get logbook from id', async () => {
		const logbookID = await getTestlogbookID()
		const test = await fetch('http://localhost:3000/logbook/' + logbookID, {
			method: 'GET'
		}).then(response => response.json())

		expect(test.period).toEqual(3)
		expect(test.group).toEqual(7)
	})

	test('Get logbook from with id not found gives error', async () => {
		const test = await fetch('http://localhost:3000/logbook/' + 21321334333, {
			method: 'GET'
		}).then(response => response.json())

		expect(test.period).toEqual(undefined)
		expect(test.group).toEqual(undefined)
	})

	test('Get the id, position, title and inputType for one column from a specific logbook', async () => {
		const logbookID = await getTestlogbookID()
		const column = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/column/1',
			{ method: 'GET' }
		).then(response => response.json())

		expect(column.position).toEqual(1)
		expect(column.title).toEqual('Hoe ging de les')
	})

	test('Get the id, position, title and inputType for one column from a specific logbook with not existing columnid gives error', async () => {
		const logbookID = await getTestlogbookID()
		const column = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/column/13',
			{ method: 'GET' }
		).then(response => response.status)

		expect(column).toEqual(500)
	})

	test('Get the id, position, title, description and imagelink for one goal for one logbook', async () => {
		const logbookID = await getTestlogbookID()
		const goal = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/goal/1',
			{ method: 'GET' }
		).then(response => response.json())

		expect(goal.title).toEqual('Les 2')
		expect(goal.description).toEqual('In deze les leer je 2*2')
	})

	test('Get the id, position, title, description and imagelink for one goal for one logbook gives error because not existing goalid', async () => {
		const logbookID = await getTestlogbookID()
		const goal = await fetch(
			'http://localhost:3000/logbook/' + logbookID + '/goal/10',
			{ method: 'GET' }
		).then(response => response.status)

		expect(goal).toEqual(500)
	})
})
