/**
 * @jest-environment node
 */

//  CHANGE DB NAME IN app.js TO testrekenlogboek

'use strict'

//Database mocking for later?!

//https://zellwk.com/blog/endpoint-testing/
//https://medium.com/@irustandi/integration-testing-mocking-your-mongodb-database-in-node-6247086fdcbc
//https://www.theodinproject.com/courses/nodejs/lessons/testing-routes-and-controllers

// const { request, response } = require('express')
// require('../models/studentlogbook')

// const getSpy = jest.fn();

// jest.doMock('express', () => {
//   return {
//     Router() {
//       return {
//         get: getSpy,
//       }
//     }
//   }
// });

// describe('should test router', () => {
//   require('../models/studentlogbook');
//   test('should test get POSTS', () => {
//     expect(getSpy).toHaveBeenCalledWith(1, '/');
//   });
// });

const mongoose = require('mongoose')
const { default: fetch } = require('node-fetch')
require('../models/studentlogbook')

const Studentlogbook = mongoose.model('StudentLogbook')

const getTestStudentlogbook = async () => {
	const studentlogbookID = await Studentlogbook.find({
		student: 'James'
	})
		.lean()
		.then(response => {
			return response[0]._id
		})

	return studentlogbookID
}

describe('Studentlogbook route tests', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017/testrekenlogboek', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		await Studentlogbook.create({
			logbookID: '5fbf66ca14b7c811a829fadf',
			student: 'James',
			answers: [
				{
					goalPosition: 1,
					columnPosition: 1,
					answer: {
						inputType: 'string',
						value: 'This is an answer 1',
						boolean: true
					}
				},
				{
					goalPosition: 1,
					columnPosition: 2,
					answer: {
						inputType: 'string',
						value: 'This is an answer 2',
						boolean: true
					}
				},
				{
					goalPosition: 2,
					columnPosition: 1,
					answer: {
						inputType: 'string',
						value: 'This is an answer 3',
						boolean: true
					}
				}
			]
		})
	})

	afterAll(async () => {
		await Studentlogbook.deleteMany({
			student: 'James'
		})
		await Studentlogbook.deleteMany({
			student: 'Piet'
		})
		await mongoose.disconnect()
	})

	test('Create a new studentlogbook', async () => {
		const createResponse = await fetch('http://localhost:3000/studentlogbook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				logbookID: '5fbf66ca14b7c811a829fada',
				student: 'Piet'
			})
		}).then(response => response.status)

		expect(createResponse).toEqual(200)
	})

	test('Get all answers from all students for a logbook', async () => {
		const createResponse = await fetch(
			'http://localhost:3000/studentlogbook/logbooks/5fbf66ca14b7c811a829fadf/answers',
			{
				method: 'GET'
			}
		).then(response => response.status)

		expect(createResponse).toEqual(200)
	})

	test('Get information about studentlogbook by ID', async () => {
		const studentlogbookID = await getTestStudentlogbook()

		const response = await fetch(
			'http://localhost:3000/studentlogbook/' + studentlogbookID,
			{
				method: 'GET'
			}
		).then(response => response.json())

		expect(response.student).toEqual('James')
	})

	test('Get answers from Student by ID', async () => {
		const studentlogbookID = await getTestStudentlogbook()

		const response = await fetch(
			'http://localhost:3000/studentlogbook/' + studentlogbookID + '/answers',
			{
				method: 'GET'
			}
		).then(response => response.json())

		expect(response[0].answer.value).toEqual('This is an answer 1')
		expect(response[1].answer.value).toEqual('This is an answer 2')
		expect(response[2].answer.value).toEqual('This is an answer 3')
	})

	test('Get answers from a student from one column', async () => {
		const studentlogbookID = await getTestStudentlogbook()

		const response = await fetch(
			'http://localhost:3000/studentlogbook/' +
				studentlogbookID +
				'/answers/column/' +
				1,
			{
				method: 'GET'
			}
		).then(response => response.json())

		expect(response[0].answer.value).toEqual('This is an answer 1')
		expect(response[1].answer.value).toEqual('This is an answer 3')
	})

	test('Get answers from a student from one row (goal)', async () => {
		const studentlogbookID = await getTestStudentlogbook()

		const response = await fetch(
			'http://localhost:3000/studentlogbook/' +
				studentlogbookID +
				'/answers/goal/' +
				1,
			{
				method: 'GET'
			}
		).then(response => response.json())

		expect(response[0].answer.value).toEqual('This is an answer 1')
		expect(response[1].answer.value).toEqual('This is an answer 2')
	})
})
