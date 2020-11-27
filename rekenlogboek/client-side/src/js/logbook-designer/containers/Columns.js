import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import Jumbotron from '../../common/Jumbotron'
import InfoContainer from '../../common/InfoContainer'
import SelectColumnTypes from '../components/SelectColumnTypes'
import Button from '../../common/Button'
import Illustration from '../components/Illustration'
import { addLogbookColumns } from '../../../redux/logbook/actions'

import Image from '../../../img/illustrations/log_select_question_type.svg'
import '../../../scss/logbook-designer/containers/NewLogbook.scss'

function Page2(props) {
	const [columnTitle1, setColumnTitle1] = useState(props.title1)
	const [columnType1, setColumnType1] = useState(props.inputType1)

	const [columnTitle2, setColumnTitle2] = useState(props.title2)
	const [columnType2, setColumnType2] = useState(props.inputType2)

	const changeTitleHandler = (column, value) => {
		column === 1 ? setColumnTitle1(value) : setColumnTitle2(value)
	}

	const changeTypeHandler = (column, value) => {
		column === 1 ? setColumnType1(value) : setColumnType2(value)
	}

	let history = useHistory()
	const nextButtonHandler = () => {
		const payload = {
			columns: [
				{ position: 1, title: columnTitle1, inputType: columnType1 },
				{ position: 2, title: columnTitle2, inputType: columnType2 }
			]
		}

		if (columnTitle1.trim().length > 0 && columnTitle2.trim().length > 0) {
			props.addLogbookColumns(payload)
			history.push('./goals')
		} else {
			//TODO: replace this by something less evil than a alert
			alert('Vul a.u.b. alle velden in.')
		}
	}

	return (
		<div className="new-logbook">
			<Jumbotron>
				<div className="vertical-center">
					<SelectColumnTypes
						changeTypeHandler={changeTypeHandler}
						changeTitleHandler={changeTitleHandler}
						columnTitle1={columnTitle1}
						columnTitle2={columnTitle2}
						columnType1={columnType1}
						columnType2={columnType2}
					/>
				</div>
				<InfoContainer>
					<Illustration
						title="Kies de 2 kolomtypes van een logboek."
						image={Image}
					/>
				</InfoContainer>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => history.push('./general')}
				/>
			</div>
			<div className="next button">
				<Button
					color="blue"
					value="Volgende"
					handler={() => nextButtonHandler()}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		title1: state.logbook.columns[0].title,
		inputType1: state.logbook.columns[0].inputType,
		title2: state.logbook.columns[1].title,
		inputType2: state.logbook.columns[1].inputType
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addLogbookColumns: payload => dispatch(addLogbookColumns(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Page2)
