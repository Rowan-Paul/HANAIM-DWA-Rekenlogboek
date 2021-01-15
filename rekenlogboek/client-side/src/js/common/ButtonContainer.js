import React from 'react'
import Button from './Button'

import '../../scss/common/ButtonContainer.scss'

export default function ButtonContainer(props) {
	let className
	if (props.className === undefined) {
		className = ''
	} else {
		className = props.className
	}

	return (
		<div className={`button-container ${className}`}>
			<div className="icon-container">
				<img src={props.icon} alt="icon" />
			</div>
			<p>{props.description}</p>

			<Button
				color={props.color}
				handler={props.handler}
				value={props.value}
			></Button>
		</div>
	)
}
