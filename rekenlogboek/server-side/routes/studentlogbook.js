'use strict'

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const app = require('../app')

const Logbook = mongoose.model('Logbook')
const StudentLogbook = mongoose.model('StudentLogbook')

// Create a new studentlogbook
router.post('/', (req, res) => {
	StudentLogbook.create({
		logbookID: req.body.logbookID,
		student: req.body.student
	})
		.then(() => {
			res.sendStatus(200)
		})
		.catch(err => {
			res.sendStatus(500)
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
			student: req.body.student,
			logbookID: req.body.logbookID,
			answers: req.body.answers
		}
	)
		.then(response => {
			Logbook.findById(response.logbookID, 'teacher')
				.then(logbookResponse => {
					app.io
						.to(logbookResponse.teacher)
						.emit('NEW_ANSWER', req.body.student)
					res.status(200).send(response.answers)
				})
				.catch(err => {
					console.log(err)
					res.status(500).send(err)
				})
		})
		.catch(err => {
			console.log(err)
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
router.get('/logbooks/:logbookID/answers', (req, res) => {
	StudentLogbook.find({ logbookID: req.params.logbookID })
		.select('student answers')
		.then(response => {
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
	/** Init object property if not exist */
	Object.prototype.initProperty = function (name, defaultValue) {
		if (!(name in this)) this[name] = defaultValue
	}

	const students = await StudentLogbook.find({ logbookID: req.params.id })
	const answers = {
		rows: {}
	}

	// Code for creating overview
	students.map(student => {
		student.answers.map(answer => {
			// Create row prop if not exist
			answers.rows.initProperty(answer.goalPosition, {})

			// Create column within row if not exist
			answers.rows[answer.goalPosition].initProperty(0, {}) // Default 0 for goal
			answers.rows[answer.goalPosition].initProperty(answer.columnPosition, [])

			// Upsert times answered
			const cell = answers.rows[answer.goalPosition][answer.columnPosition]
			const item = cell.findIndex(a => a.value === answer.answer.value)

			if (item > -1) {
				cell[item] = { ...cell[item], count: ++cell[item].count }
			} else {
				cell.push({ value: answer.answer.value, count: 1 })
			}
		})
	})

	res.status(200).send(answers)
})

module.exports = router
