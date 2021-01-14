'use strict'

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const app = require('../app')

const Logbook = mongoose.model('Logbook')
const StudentLogbook = mongoose.model('StudentLogbook')

/**
 * Create a new studentlogbook
 * @route POST /studentlogbook
 */
router.post('/', (req, res) => {
	if (req.body.logbookID === undefined || req.body.student === undefined) {
		res.sendStatus(400)
	} else {
		StudentLogbook.create({
			logbookID: req.body.logbookID,
			student: req.body.student
		})
			.then(response => {
				const obj = {
					studentlogbookID: response._id
				}
				res.status(200).send(obj)
			})
			.catch(err => {
				res.status(500).send(err)
			})
	}
})

/**
 * Updates a studentlogbook
 * @route PUT /studentlogbook
 */
router.put('/', (req, res) => {
	if (req.body.logbookID === undefined || req.body.student === undefined) {
		res.sendStatus(400)
	} else {
		StudentLogbook.findOneAndUpdate(
			{
				$and: [
					{ logbookID: { $eq: req.body.logbookID } },
					{ student: { $eq: req.body.student } }
				]
			},
			{
				logbookID: req.body.logbookID,
				student: req.body.student
			},
			{
				new: true,
				upsert: true // Make this update into an upsert
			}
		)
			.then(response => {
				res.status(200).send(response)
			})
			.catch(err => {
				console.log('error 4: ' + err)
				res.status(500).send(err)
			})
	}
})

/**
 * Update a studentlogbook based on id
 * @route PUT /studentlogbook/:id
 * @param id - The studentlogbook id
 */
router.put('/:id', (req, res) => {
	if (req.params.id === undefined || req.body.answers === undefined) {
		console.log('HELLO THERE')
		res.sendStatus(400)
	} else {
		StudentLogbook.findOneAndUpdate(
			{
				$and: [{ _id: { $eq: req.params.id } }]
			},
			{
				answers: req.body.answers
			},
			{
				new: true
			}
		)
			.then(response => {
				Logbook.findById(response.logbookID, '_id')
					.then(logbookResponse => {
						app.io.emit('NEW_ANSWER', {
							student: response.student,
							studentlogbookID: response._id,
							logbookID: logbookResponse._id
						})
						console.log(response)
						res.status(200).send(response)
					})
					.catch(err => {
						console.log('Error 1: ' + err)
						res.status(500).send(err)
					})
			})
			.catch(err => {
				console.log('error 2: ' + err)
				res.status(500).send(err)
			})
	}
})

/**
 * Get all information about a specific studentlogbook
 * @route GET /studentlogbook/:id
 * @param id - The studentlogbook id
 */
router.get('/:id', (req, res) => {
	StudentLogbook.findById(req.params.id)
		.then(response => {
			res.status(200).send(response)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

/**
 * Get all studentlogbooks related to one logbook (not related to studentlogbook)
 * @route GET /studentlogbook/logbook/:logbookid
 * @param logbookid - The logbook id
 */
router.get('/logbook/:logbookid', (req, res) => {
	StudentLogbook.find({
		logbookID: req.params.logbookid
	})
		.then(response => {
			res.status(200).send(response)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

// Get the logbook from one student based on the logbookid (not based on the id of studentlogbook)
router.get('/logbook/:logbookid/student/:student', (req, res) => {
	StudentLogbook.find({
		logbookID: req.params.logbookid,
		student: req.params.student
	})
		.then(response => {
			res.status(200).send(response)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

/**
 * Shows an group overview including all answers sorted by row, column
 */
router.get('/:id/group-overview', async (req, res) => {
	const students = await StudentLogbook.find({ logbookID: req.params.id })
	const answers = {
		rows: {}
	}

	// Code for creating overview
	students.map(student => {
		if (student.answers && student.answers.length) {
			student.answers.map(answer => {
				// Create row prop if not exist
				if (!answers.rows[answer.goalPosition]) {
					answers.rows[answer.goalPosition] = {}
				}

				// Create column within row if not exist
				answers.rows[answer.goalPosition][0] = [] // Default 0 for goal
				if (!answers.rows[answer.goalPosition][answer.columnPosition]) {
					answers.rows[answer.goalPosition][answer.columnPosition] = []
				}

				// Upsert times answered
				const cell = answers.rows[answer.goalPosition][answer.columnPosition]
				const item = cell.findIndex(a => a.value === answer.answer.value)

				if (item > -1) {
					cell[item] = { ...cell[item], count: ++cell[item].count }
				} else {
					cell.push({ value: answer.answer.value, count: 1 })
				}
			})
		}
	})

	res.status(200).send(answers)
})

module.exports = router
