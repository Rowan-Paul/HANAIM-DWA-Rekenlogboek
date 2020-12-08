import React from 'react'

import Happy from '../../../img/icons/evaluation/happy.svg'
import Sad from '../../../img/icons/evaluation/sad.svg'
import Sceptic from '../../../img/icons/evaluation/sceptic.svg'

import '../../../scss/common/Evaluation.scss'
export default function Evaluation() {
	return (
		<ul className="Evaluation">
			<li>
				<label>
					<input type="radio" name="evaluation" value="Happy" />
					<div>
						<img src={Happy} alt="Happy" />
					</div>
				</label>
			</li>

			<li>
				<label>
					<input type="radio" name="evaluation" value="Sceptic" />
					<div>
						<img src={Sceptic} alt="Sceptic" />
					</div>
				</label>
			</li>

			<li>
				<label>
					<input type="radio" name="evaluation" value="Sad" />
					<div>
						<img src={Sad} alt="Sad" />
					</div>
				</label>
			</li>

			<li>
				<span>Goed</span>
			</li>
			<li>
				<span>Ok</span>
			</li>
			<li>
				<span>Slecht</span>
			</li>
		</ul>
	)
}
