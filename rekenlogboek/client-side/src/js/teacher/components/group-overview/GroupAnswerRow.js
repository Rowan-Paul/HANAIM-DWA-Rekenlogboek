import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import Checkboxes from '../../../common/InputTypes/Checkboxes'
import Evaluation from '../../../common/InputTypes/Evaluation'
import Radiobuttons from '../../../common/InputTypes/Radiobuttons'
import Textarea from '../../../common/InputTypes/Textarea'

function GroupAnswerRow(props) {
	const [logbook, setLogbook] = useState(props.logbook)
	const [studentInfo, setStudentInfo] = useState(props.studentInfo)

	const handler = answer => {
		if (answer) {
			const column = logbook.columns[answer.columnPosition]

			switch (answer.columnPosition) {
				case 3: // evaluation
					return (
						<Evaluation
							answer={answer}
							key={shortid.generate()}
							input={column.input}
							state={props.inputStates.inPreview}
						/>
					)
				default:
					switch (answer.answer.inputType) {
						// CHECKBOXES
						case props.inputTypes.checkboxes:
							return (
								<Checkboxes
									answer={answer}
									options={column.input.options}
									state={props.inputStates.inPreview}
								/>
							)

						// RADIOBUTTONS
						case props.inputTypes.radiobuttons:
							return (
								<Radiobuttons
									answer={answer}
									options={column.input.options}
									state={props.inputStates.inPreview}
								/>
							)

						// TEXTAREA
						case props.inputTypes.textarea:
							return <Textarea state={props.inputStates.inPreview} />
						default:
							return <div className="Cell"></div>
					}
			}
		} else {
			return <div className="Cell"></div>
		}
	}

	return (
		<div className="Row Body">
			<div className="Cell">{studentInfo.student}</div>

			<div className="InputType Cell" key={shortid.generate()}>
				<ul>
					<li>{handler(studentInfo.answers[0])}</li>
				</ul>
			</div>

			<div className="InputType Cell" key={shortid.generate()}>
				<ul>
					<li>{handler(studentInfo.answers[1])}</li>
				</ul>
			</div>

			<div className="InputType Cell" key={shortid.generate()}>
				<ul>
					<li>{handler(studentInfo.answers[2])}</li>
				</ul>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		inputTypes: state.main.inputTypes,
		inputStates: state.main.inputStates,
		logbook: state.groupOverview.logbook,
		logbookTypes: state.main.logbookTypes
	}
}
const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAnswerRow)
