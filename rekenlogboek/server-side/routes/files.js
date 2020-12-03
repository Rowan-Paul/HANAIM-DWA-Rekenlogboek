'use strict'

const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')

// file upload api
router.post('/uploads/goals', (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: 'file is not found' })
	}
	// accessing the file
	const myFile = req.files.file
	const fileName = (Date.now() + '_' + myFile.name).toLowerCase()
	//  mv() method places the file inside public directory
	myFile.mv(
		`${process.cwd()}/static/uploads/goals/${fileName}`,
		function (err) {
			if (err) {
				console.log(err)
				return res.status(500).send({ msg: 'Error occured' })
			}
			// returing the response with file path and name
			return res.send({
				name: myFile.name,
				path: fileName
			})
		}
	)
})

module.exports = router
