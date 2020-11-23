import React from 'react'
import '../../../scss/common/components/Button.scss'

export default function Button(props) {
	return (
		<button
			className={`bttn ${props.color} hover-${props.color}`}
			onClick={() => props.handler()}
		>
			{props.value}
		</button>
	)
}
