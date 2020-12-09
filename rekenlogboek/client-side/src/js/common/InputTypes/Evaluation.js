import React from 'react'
import ClassNames from 'classnames'

import Happy from '../../../img/icons/evaluation/happy.svg'
import Sad from '../../../img/icons/evaluation/sad.svg'
import Sceptic from '../../../img/icons/evaluation/sceptic.svg'

import '../../../scss/common/Evaluation.scss'
export default function Evaluation(props) {
	const newAnswer = value => {
		if (props.readonly) {
			props.changeAnswer(value)
		}
	}

	return (
		<ul className="Evaluation">
			{console.log('rendaa')}
			<li
				className={ClassNames({
					happy: props.inputAnswer === 'Happy'
				})}
			>
				<label>
					<input
						type="radio"
						name="evaluation"
						value="Happy"
						onChange={e => newAnswer(e.target.value)}
					/>
					<div>
						<img src={Happy} alt="Happy" />
					</div>
				</label>
			</li>

			<li
				className={ClassNames({
					sceptic: props.inputAnswer === 'Sceptic'
				})}
			>
				<label>
					<input
						type="radio"
						name="evaluation"
						value="Sceptic"
						onChange={e => newAnswer(e.target.value)}
					/>
					<div>
						<img src={Sceptic} alt="Sceptic" />
					</div>
				</label>
			</li>

			<li
				className={ClassNames({
					sad: props.inputAnswer === 'Sad'
				})}
			>
				<label>
					<input
						type="radio"
						name="evaluation"
						value="Sad"
						onChange={e => newAnswer(e.target.value)}
					/>
					<div>
						<img src={Sad} alt="Sad" />
					</div>
				</label>
			</li>

			<li>
				<span onClick={() => newAnswer('Happy')}>Goed</span>
			</li>
			<li>
				<span onClick={() => newAnswer('Sceptic')}>Ok</span>
			</li>
			<li>
				<span onClick={() => newAnswer('Sad')}>Slecht</span>
			</li>
		</ul>
	)
}
