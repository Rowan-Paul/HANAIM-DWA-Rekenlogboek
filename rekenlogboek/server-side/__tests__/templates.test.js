/**
 * @jest-environment node
 */
// IMPORTANT: change the db name in app to testrekenlogboek

'use strict'

const mongoose = require('mongoose')
const { default: fetch } = require('node-fetch')
require('../models/templates')

const Templates = mongoose.model('Templates')

const getTemplateID = async () => {
	const number = await Templates.find({
		name: 'groep 5 template'
	})
		.lean()
		.then(response => {
			return response[0]._id
		})

	return number
}

describe('Template test routes', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017/testrekenlogboek', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		await Templates.create([
			{
				name: 'groep 5 template',
				group: 5,
				columns: [
					{
						position: 0,
						title: 'Doelen',
						inputType: 'xx'
					},
					{
						position: 1,
						title: 'Lesofzo',
						inputType: 'xx'
					},
					{
						position: 2,
						title: 'Instructie nodig?',
						inputType: 'xx'
					},
					{
						position: 3,
						title: 'Evaluatie',
						inputType: 'xx'
					}
				]
			},
			{
				name: 'groep 7 18/19 template',
				group: 7,
				columns: [
					{
						position: 0,
						title: 'Doelen',
						inputType: 'xx'
					},
					{
						position: 1,
						title: 'Lesofzo',
						inputType: 'xx'
					},
					{
						position: 2,
						title: 'Instructie nodig?',
						inputType: 'xx'
					},
					{
						position: 3,
						title: 'Evaluatie',
						inputType: 'xx'
					}
				]
			}
		])
	})

	afterAll(async () => {
		await Templates.deleteMany({})
		await mongoose.disconnect()
	})

	test('Get template', async () => {
		const template = await fetch(
			'http://localhost:3000/templates/' + (await getTemplateID()),
			{
				method: 'GET'
			}
		).then(result => result.json())

		const result = {
			name: 'groep 5 template'
		}

		// only checking name because all columns
		// get their own random id
		expect(template.name).toEqual(result.name)
	})
})
