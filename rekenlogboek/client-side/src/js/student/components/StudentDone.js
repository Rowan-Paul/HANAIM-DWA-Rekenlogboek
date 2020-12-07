import React from 'react'

import '../../../scss/student/components/StudentDone.scss'

import doneSVG from '../../../img/illustrations/after_pretest_done.svg'

export default function StudentDone(props) {
	return (
		<div className="end-text">
			<h1>{props.title}</h1>
			<p>{props.description}</p>

			<img src={doneSVG} alt="student klaar met invullen" />
		</div>
	)
}
