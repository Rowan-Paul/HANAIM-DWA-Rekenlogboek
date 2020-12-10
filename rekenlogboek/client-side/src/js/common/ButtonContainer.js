import React from 'react'
import Button from './Button'

import '../../scss/common/ButtonContainer.scss'

export default function ButtonContainer(props) {
	return (
		<div className="button-container">
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
