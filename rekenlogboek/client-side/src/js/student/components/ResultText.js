import React from 'react'

import '../../../scss/student/components/ResultText.scss'

import doneSVG from '../../../img/illustrations/after_pretest_done.svg'

export default function ResultText(props) {
	return (
		<div className="result-text">
			<h1>{props.title}</h1>
			<p>{props.description}</p>

			<img src={doneSVG} alt="student klaar met invullen" />
		</div>
	)
}
