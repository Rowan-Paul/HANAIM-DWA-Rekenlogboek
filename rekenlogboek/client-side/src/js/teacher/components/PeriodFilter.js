import React from 'react'
import { connect } from 'react-redux'
import '../../../scss/teacher/components/PeriodFilter.scss'

import Button from '../../common/Button'

function PeriodFilter(props) {
	return (
		<div className="period-filter">
			<div>Leerjaar:</div>
			<select>
				<option value="19/20">19/20</option>
				<option value="20/21">20/21</option>
			</select>
			<div>Blok:</div>
			<input type="number" defaultValue="1" min="1" max="99" />
			<Button color="blue" handler={() => {}} value="Kies blok" />
		</div>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		modalShow: payload => dispatch(modalShow(payload)),
		modalHide: () => dispatch(modalHide())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodFilter)
