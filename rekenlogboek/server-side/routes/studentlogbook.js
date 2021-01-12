'use strict'

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const app = require('../app')

const Logbook = mongoose.model('Logbook')
const StudentLogbook = mongoose.model('StudentLogbook')

// Check if a logbook exists for a student in a group
router.get('/:student/logbooks/:logbookID', (req, res) => {
	StudentLogbook.findOne({
		$and: [
			{ logbookID: { $eq: req.params.logbookID } },
			{ student: { $eq: req.params.student } }
		]
	})
		.then(response => {
			if (response === null) {
				res.sendStatus(404)
			} else {
				res.status(200).send(response)
			}
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

// Create a new studentlogbook
router.post('/', (req, res) => {
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
})

// Update a studentlogbook
router.put('/', (req, res) => {
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
			// Logbook.findById(response.logbookID, 'teacher')
			// 	.then(logbookResponse => {
			// 		app.io
			// 			.to(logbookResponse.teacher)
			// 			.emit('NEW_ANSWER', req.body.student)
			// 		res.status(200).send(response.answers)
			// 	})
			// 	.catch(err => {
			// 		console.log('error 3: ' + err)
			// 		res.status(500).send(err)
			// })
		})
		.catch(err => {
			console.log('error 4: ' + err)
			res.status(500).send(err)
		})
})

// Update a studentlogbook based on id
router.put('/:id', (req, res) => {
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
					res.status(200).send(response)
				})
				.catch(err => {
					console.log('Error: ' + err)
					res.status(500).send(err)
				})
		})
		.catch(err => {
			console.log('error: ' + err)
			res.status(500).send(err)
		})
})

// Get all information about a specific studentlogbook
router.get('/:id', (req, res) => {
	StudentLogbook.findById(req.params.id)
		.then(response => {
			res.status(200).send(response)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

// Get all answers (from all students) for a logbook
// Returns only the id, student and answers
router.get('/:logbookID/group-answers', (req, res) => {
	// Query Paramaters
	const goal = req.query.goal
	const column = req.query.column
	const answer = req.query.answer

	StudentLogbook.find({ logbookID: req.params.logbookID })
		.select('student answers')
		.then(students => {
			/**
			 * Filters all student answers
			 * Filter works if query param isset
			 */
			const response = [] // Define for pushing
			students.filter(student => {
				const check = student.answers.map(
					a =>
						(!goal || a.goalPosition == goal) &&
						(!column || a.columnPosition == column) &&
						(!answer || a.answer.value == answer)
				)

				// Only append if contains answers

				if (check.indexOf(true) > -1) response.push(student)
			})

			res.status(200).send(response)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

// Get all answers given by the student
router.get('/:id/answers', (req, res) => {
	StudentLogbook.findById(req.params.id)
		.lean()
		.then(response => {
			res.status(200).send(response.answers)
		})
		.catch(err => {
			console.log('error 5: ' + err)
			res.status(500).send(err)
		})
})

// Get all answers from a student from one column
router.get('/:id/answers/column/:position', (req, res) => {
	StudentLogbook.findById(req.params.id)
		.lean()
		.then(response => {
			const columnAnswers = response.answers.filter(object => {
				return object.columnPosition === Number(req.params.position)
			})
			res.status(200).send(columnAnswers)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

// Get all answers from a student from one row which belongs to one goal
router.get('/:id/answers/goal/:position', (req, res) => {
	StudentLogbook.findById(req.params.id)
		.lean()
		.then(response => {
			const columnAnswers = response.answers.filter(object => {
				return object.goalPosition === Number(req.params.position)
			})
			res.status(200).send(columnAnswers)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

// Get all studentlogbooks from one student
router.get('/student/:student', (req, res) => {
	StudentLogbook.find({ student: req.params.student })
		.then(response => {
			res.status(200).send(response)
		})
		.catch(err => {
			res.status(500).send(err)
		})
})

// Get all studentlogbooks related to one logbook (not related to studentlogbook)
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
