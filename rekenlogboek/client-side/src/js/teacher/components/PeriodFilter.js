import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../../scss/teacher/components/PeriodFilter.scss'

import { getYears } from '../../redux/allow-student-access/actions'
import Button from '../../common/Button'

function PeriodFilter(props) {
	const [selectedSchoolYear, setSelectedSchoolYear] = useState(
		props.currentSchoolYear
	)
	const [selectedPeriod, setSelectedPeriod] = useState(1)

	useEffect(() => {
		props.getSchoolYears()
	}, [])

	const getSchoolYearOptions = () => {
		return props.schoolYears?.map(year => {
			return (
				<option value={year} key={year}>
					{year}
				</option>
			)
		})
	}

	const updateSelectValue = value => {
		setSelectedSchoolYear(value)
	}

	const updatePeriodValue = value => {
		setSelectedPeriod(value)
	}

	return (
		<div className="period-filter">
			<div>Leerjaar:</div>
			<select
				id="select-school-year"
				value={selectedSchoolYear}
				onChange={e => {
					updateSelectValue(e.target.value)
				}}
			>
				{getSchoolYearOptions()}
			</select>
			<div>Blok:</div>
			<input
				type="number"
				defaultValue="1"
				min="1"
				max="99"
				onChange={e => updatePeriodValue(e.target.value)}
			/>
			<Button
				color="blue"
				handler={() => props.filterClick(selectedSchoolYear, selectedPeriod)}
				value="Kies blok"
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		schoolYears: state.allowStudentAccess.schoolYears,
		currentSchoolYear: state.allowStudentAccess.currentSchoolYear
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSchoolYears: () => dispatch(getYears)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodFilter)
