import '../../scss/sigin-in/SignIn.scss'

import React from 'react'

export default function SignIn(props) {
	String.prototype.removeCharAt = function (i) {
		var tmp = this.split('') // convert to an array
		tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
		return tmp.join('') // reconstruct the string
	}

	// remove questionmark and split
	// in different params
	const removeChar = props.location.search.removeCharAt(1)
	console.log('removeChar: ', removeChar)
	const splitParams = removeChar.split('&')
	console.log('splitParams: ', splitParams)

	// TODO: this should be added to the redux state
	// remove %20, select the correct
	// string from the array and convert it to a string
	let user = {
		name: decodeURIComponent(
			splitParams[0].split('=').splice(0 - 1, 1)
		).toString(),
		jobTitle: decodeURIComponent(
			splitParams[1].split('=').splice(0 - 1, 1)
		).toString(),
		email: decodeURIComponent(
			splitParams[2].split('=').splice(0 - 1, 1)
		).toString(),
		groups: decodeURIComponent(splitParams[3])
			.split('=')
			.splice(0 - 1, 1)
			.toString()
			.split(',')
	}

	console.log('user: ', user)
	console.log('===')

	return (
		<section>
			<p>
				Hello, {user.name} <br></br>
				Email: {user.email} <br></br>
				jobTitle: {user.jobTitle} <br></br>
				Groups: {user.groups}
			</p>
		</section>
	)
}
