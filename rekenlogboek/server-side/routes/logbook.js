'use strict'

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Logbook = mongoose.model('Logbook')

/**
 * Creates a new logbook
 * @route POST /logbook
 * @param {body} - Object with logbook info
 */
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

/**
 * Update a logbook's currentPhase
 * @route PUT /logbook/:id/currentPhase
 * @param id - id for the logbook to change
 */
router.put('/:id/currentPhase', (req, res) => {
	if (req.params.id === undefined || req.body.currentPhase === undefined)
		res.sendStatus(400)

	if (
		req.body.currentPhase !== 'pretest' &&
		req.body.currentPhase !== 'instructions' &&
		req.body.currentPhase !== 'evaluation'
	)
		res.sendStatus(400)

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

/**
 * Get the active logbook for a certain group
 * @route GET /logbooks/groups/:group
 * @param group - the group to look for
 */
router.get('/groups/:group', (req, res) => {
	Logbook.findOne({
		group: req.params.group,
		currentPhase: { $ne: 'notVisible' }
	}).then(response => {
		if (response) {
			res.status(200).send(response)
		} else {
			res.sendStatus(404)
		}
	})
})

/**
 * Update a logbook's currentGoal
 * @route PUT /logbook/:id/activeGoal
 * @param id - the logbook id
 */
router.put('/:id/activeGoal', (req, res) => {
	if (
		req.params.id === undefined ||
		req.body.activeGoal === undefined ||
		!Number.isInteger(req.body.activeGoal)
	) {
		res.sendStatus(400)
	} else {
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
	}
})

/**
 * Get all information about one logbook with specifications
 * @route GET /logbook/years/:year/groups/:group/periods/:period
 * @param year - the year the logbook is in
 * @param group - the group the logbook is in
 * @param period - the period the logbook is in
 */
router.get('/years/:year/groups/:group/periods/:period', (req, res) => {
	Logbook.find({
		year: req.params.year,
		group: req.params.group,
		period: req.params.period
	})
		.then(response => {
			if (response.length < 1) {
				res.sendStatus(500)
			} else {
				res.status(200).send(response[0])
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

/**
 * Get the amount of periods based on group and year
 * @route GET /logbook/years/:year/groups/:group/periods
 * @param group - the group the logbook is in
 * @param year - the year the logbook is in
 */
router.get('/years/:year/groups/:group/periods', (req, res) => {
	Logbook.find({
		year: req.params.year,
		group: req.params.group
	})
		.distinct('period', () => {})
		.then(response => {
			if (response < 1) {
				throw 'No matching logbooks'
			}
			res.status(200).send(response)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send(err)
		})
})

module.exports = router
