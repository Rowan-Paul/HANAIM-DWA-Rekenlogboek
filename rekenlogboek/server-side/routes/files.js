'use strict'

const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')

// file upload api
router.post('/upload/goals', (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: 'file is not found' })
	}
	// accessing the file
	const myFile = req.files.file
	//  mv() method places the file inside public directory
	myFile.mv(
		`${process.cwd()}/uploads/goals/${Date.now()}${myFile.name}`,
		function (err) {
			if (err) {
				console.log(err)
				return res.status(500).send({ msg: 'Error occured' })
			}
			// returing the response with file path and name
			return res.send({
				name: myFile.name,
				path: `${Date.now()}${myFile.name}`
			})
		}
	)
})

module.exports = router
