import React from 'react'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Happy from '../../../img/icons/evaluation/happy.svg'
import Sad from '../../../img/icons/evaluation/sad.svg'
import Sceptic from '../../../img/icons/evaluation/sceptic.svg'

import '../../../scss/common/Evaluation.scss'
function Evaluation(props) {
	const emotions = [
		{
			text: 'Goed',
			img: Happy,
			name: 'Happy'
		},
		{
			text: 'OK',
			img: Sceptic,
			name: 'Sceptic'
		},
		{
			text: 'Slecht',
			img: Sad,
			name: 'Sad'
		}
	]

	const handler = () => {
		switch (props.state) {
			// IN USE
			case props.inputStates.inUse:
				return emotions.map(v => {
					const checked = props.answer?.answer.value === v.name

					return (
						<li
							className={checked ? `${v.name}-checked` : v.name}
							key={shortid.generate()}
						>
							<label>
								<input
									className={v.name}
									name="evaluation"
									onChange={e => {
										props.changeHandler(e.target.value)
									}}
									onClick={e => {
										props.clickHandler(e.target.value)
									}}
									type="radio"
									value={v.name}
									checked={checked}
								/>
								<div>
									<img src={v.img} alt={v.text} />
									<span>{v.text}</span>
								</div>
							</label>
						</li>
					)
				})

			// ON EDIT
			case props.inputStates.onEdit:
				return emotions.map(v => (
					<li className={v.name} key={shortid.generate()}>
						<label>
							<input
								className={v.name}
								name="evaluation"
								type="radio"
								value={v.name}
								disabled
							/>
							<div>
								<img src={v.img} alt={v.text} />
								<span>{v.text}</span>
							</div>
						</label>
					</li>
				))

			// IN PREVIEW
			case props.inputStates.inPreview:
				return emotions.map(v => {
					const checked = props.answer?.answer.value === v.name

					return (
						<li
							className={checked ? `${v.name}-checked` : v.name}
							key={shortid.generate()}
						>
							<label>
								<input
									className={v.name}
									checked={checked}
									name="evaluation"
									type="radio"
									value={v.name}
									disabled
								/>
								<div>
									<img src={v.img} alt={v.text} />
									<span>{v.text}</span>
								</div>
							</label>
						</li>
					)
				})

			default:
				return (
					<p className="ErrorMessage">
						Evaluation: props.state not set! (see state.main.inputStates)
					</p>
				)
		}
	}

	return <ul className="Evaluation">{handler()}</ul>
}

const mapStateToProps = state => {
	return {
		inputStates: state.main.inputStates
	}
}

export default connect(mapStateToProps)(withRouter(Evaluation))
