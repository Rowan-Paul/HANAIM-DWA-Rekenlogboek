'use strict'

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const app = require('../app')

const Logbook = mongoose.model('Logbook')
const StudentLogbook = mongoose.model('StudentLogbook')

// Check if a logbook exists for a student in a group
router.get('/:student/logbooks/:logbookID', (req, res) => {
	console.log(req.params.logbookID)
	console.log(req.params.student)
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
				// const obj = {
				// 	studentlogbookID: response._id
				// }
				// res.status(200).send(obj)
				console.log('Logging the reponse on studentlogbook: ' + response)
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
	console.log('logging all ansers from student: ' + req.params.id)
	StudentLogbook.findById(req.params.id)
		.lean()
		.then(response => {
			console.log('Logging all answers from a student reponse: ' + response)
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

module.exports = router
