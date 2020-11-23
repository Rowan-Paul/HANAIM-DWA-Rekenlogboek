import React from 'react'
import Button from './Button'

import '../../../scss/common/components/ButtonContainer.scss'
import icon from '../../../img/icons/archive.svg'

export default function ButtonContainer(props) {
	return (
		<div className="ButtonContainer">
			<div className="iconContainer">
				<img src={icon} alt="icon" />
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
