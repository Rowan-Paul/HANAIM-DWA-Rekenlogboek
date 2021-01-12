import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Button from '../../common/Button'
import * as actions from '../../redux/allow-student-access/actions'

import '../../../scss/teacher/components/PeriodFilter.scss'
function PeriodFilter(props) {
	useEffect(() => {
		if (!props.user.name) {
			props.history.push('./')
		} else {
			props.getFilterOptions()
		}
	}, [])

	console.log(
		'schoolYears',
		props.schoolYears,
		'activeSchoolYear',
		props.activeSchoolYear,
		'selectedSchoolYear',
		props.selectedSchoolYear,
		'periods',
		props.periods,
		'activePeriod',
		props.activePeriod,
		'selectedPeriod',
		props.selectedPeriod
	)
	const getSchoolYearOptions = () => {
		if (Array.isArray(props.schoolYears)) {
			return props.schoolYears.map(year => {
				return (
					<option value={year} key={year}>
						{year}
					</option>
				)
			})
		} else if (props.schoolYears !== undefined) {
			const year = props.schoolYears
			return <option value={year}>{year}</option>
		}
	}

	const getPeriodOptions = () => {
		if (Array.isArray(props.periods)) {
			return props?.periods.map(period => {
				return (
					<option value={period} key={period}>
						{period}
					</option>
				)
			})
		} else if (props.periods !== undefined) {
			const period = props.periods
			return <option value={period}>{period}</option>
		}
	}

	const updateSelectedSchoolYear = schoolYear => {
		props.changeSelectedSchoolYear(schoolYear)
		props.getPeriodsBySchoolYear({ schoolYear })
	}

	const updateSelectedPeriod = period => {
		props.changeSelectedPeriod(period)
	}

	return (
		<div className="period-filter">
			<div>Leerjaar:</div>
			<select
				id="select-school-year"
				value={
					props.selectedSchoolYear !== undefined
						? props.selectedSchoolYear
						: props.activeSchoolYear
				}
				onChange={e => {
					updateSelectedSchoolYear(e.target.value)
				}}
			>
				{getSchoolYearOptions()}
			</select>
			<div>Blok:</div>
			<select
				id="select-period"
				value={
					props.selectedPeriod !== undefined
						? props.selectedPeriod
						: props.activePeriod
				}
				onChange={e => updateSelectedPeriod(e.target.value)}
			>
				{getPeriodOptions()}
			</select>

			<Button
				color="blue"
				handler={() =>
					props.filterClick(
						props.selectedSchoolYear !== undefined
							? props.selectedSchoolYear
							: props.activeSchoolYear,
						props.selectedPeriod !== undefined
							? props.selectedPeriod
							: props.activePeriod
					)
				}
				value="Kies blok"
			/>
		</div>
	)
}

const mapStateToProps = state => {
	const studentAccess = state.allowStudentAccess
	return {
		schoolYears: studentAccess.schoolYears,
		activeSchoolYear: studentAccess.activeSchoolYear,
		selectedSchoolYear: studentAccess.selectedSchoolYear,
		periods: studentAccess.periods,
		activePeriod: studentAccess.activePeriod,
		selectedPeriod: studentAccess.selectedPeriod,
		user: state.main.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFilterOptions: () => dispatch(actions.getFilterOptions),
		getPeriodsBySchoolYear: payload => dispatch(actions.getPeriods(payload)),
		changeSelectedPeriod: payload =>
			dispatch(actions.changeSelectedPeriod(payload)),
		changeSelectedSchoolYear: payload =>
			dispatch(actions.changeSelectedSchoolYear(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(PeriodFilter))
