import React from 'react'

import { connect } from 'react-redux'

import { increaseCounter, decreaseCounter } from '../../redux/demo/actions'

export function Demo(props) {
	return (
		<div className="App">
			<div>Count: {props.count}</div>

			<button onClick={() => props.increaseCounter()}>Increase Count</button>

			<button onClick={() => props.decreaseCounter()}>Decrease Count</button>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		count: state.demo.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
		increaseCounter: () => dispatch(increaseCounter()),

		decreaseCounter: () => dispatch(decreaseCounter())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
