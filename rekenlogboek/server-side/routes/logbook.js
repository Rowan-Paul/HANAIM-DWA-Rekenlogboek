'use strict'

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Logbook = mongoose.model('Logbook')

// Create a new logbook
router.post('/', (req, res) => {
	Logbook.create({
		period: req.body.period,
		group: req.body.group,
		year: req.body.year,
		currentPhase: 'notVisible',
		columns: req.body.columns,
		goals: req.body.goals
	})
		.then(() => {
			res.sendStatus(200)
		})
		.catch(err => {
			console.log(err)
			res.sendStatus(500)
		})
})

// Update a logbook's currentPhase
router.put('/:id/currentPhase', (req, res) => {
	Logbook.findOneAndUpdate(
		{
			_id: req.params.id
		},
		{
			currentPhase: req.body.currentPhase
		}
	).then(response => {
		Logbook.updateMany(
			{
				$and: [
					{ currentPhase: { $ne: 'notVisible' } },
					{ group: response.group },
					{ _id: { $ne: response._id } }
				]
			},
			{ currentPhase: 'notVisible' }
		)
			.then(() => {
				res.sendStatus(200)
			})
			.catch(err => {
				console.log(err)
				res.status(500)
			})
	})
})

// Get all years from a group
router.get('/groups/:group/years', (req, res) => {
	Logbook.find({
		group: req.params.group
	})
		.distinct('year')
		.then(response => res.status(200).send(response))
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

// Get the active logbook for a certain group
router.get('/groups/:group', (req, res) => {
	Logbook.findOne(
		{
			group: req.params.group,
			currentPhase: { $ne: 'notVisible' }
		},
		'_id currentPhase year period'
	)
		.then(response => {
			console.log(response)
			res.status(200).send(response)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

// Update a logbook's currentGoal
router.put('/:id/activeGoal', (req, res) => {
	Logbook.findOneAndUpdate(
		{
			_id: req.params.id
		},
		{
			activeGoal: req.body.activeGoal
		}
	)
		.then(() => {
			res.sendStatus(200)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

// Get all information about one logbook
router.get('/:id', (req, res) => {
	Logbook.findById(req.params.id)
		.then(response => {
			res.status(200).send(response)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

// Get the id, position, title and inputType for one column from a specific logbook
router.get('/:id/column/:position', (req, res) => {
	Logbook.findById(req.params.id)
		.lean()
		.then(response => {
			const column = response.columns.find(object => {
				return object.position === Number(req.params.position)
			})

			if (column === undefined) {
				throw new Error('column does not exist')
			}

			res.status(200).send(column)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

// Get the id, position, title, description and imagelink for one goal for one logbook
router.get('/:id/goal/:position', (req, res) => {
	Logbook.findById(req.params.id)
		.lean()
		.then(response => {
			const goal = response.goals.find(object => {
				return object.position === Number(req.params.position)
			})

			if (goal === undefined) {
				throw new Error('goal does not exist')
			}

			res.status(200).send(goal)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

// Get all information about one logbook with specifications
router.get('/year/:year/group/:group/period/:period', (req, res) => {
	Logbook.find({
		year: req.params.year,
		group: req.params.group,
		period: req.params.period
	})
		.then(response => {
			if (response.length < 1) {
				res.status(200).send({})
			} else {
				res.status(200).send(response[0])
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

// Get all periods based on group and year
router.get('/groups/:group/years/:year/periods', (req, res) => {
	Logbook.find({
		year: req.params.year,
		group: req.params.group
	})
		.distinct('period', () => {})
		.then(response => {
			console.log(response)
			res.status(200).send(response)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

module.exports = router
