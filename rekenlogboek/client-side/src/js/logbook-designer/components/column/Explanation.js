import React, { useState, useEffect } from 'react'
import { setExplanation } from '../../../redux/logbook/actions'
import { connect } from 'react-redux'

import '../../../../scss/logbook-designer/components/AddGoals.scss'

function Explanation(props) {
	const [explanation, setExplanation] = useState(true)

	useEffect(() => {
		const column = props.columns.filter(c => c.position === props.position)[0]
		setExplanation(column.explanation)
	}, [props.columns])

	return (
		<div className="Block Explanation">
			<h4>Antwoord toelichten?</h4>
			<p>De leerling licht zijn / haar antwoord toe.</p>
			<ul>
				<li>
					<input
						checked={explanation === true}
						name="explanation"
						onChange={e => props.setExplanation(e.target.value)}
						type="radio"
						value={true}
					/>
					<span>Ja</span>
				</li>

				<li>
					<input
						checked={explanation === false}
						name="explanation"
						onChange={e => props.setExplanation(e.target.value)}
						type="radio"
						value={false}
					/>
					<span>Nee</span>
				</li>
			</ul>
		</div>
	)
}

const mapStateToProps = state => ({
	columns: state.logbook.columns,
	position: state.logbook.position
})

const mapDispatchToProps = dispatch => ({
	setExplanation: payload => dispatch(setExplanation(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Explanation)
