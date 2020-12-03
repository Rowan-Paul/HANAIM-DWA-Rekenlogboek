import React from 'react'
import { withRouter } from 'react-router-dom'

import ProgressBar from '../components/ProgressBar'

function AfterPreTest() {
	return (
		<div className="after-pre-test">
			<ProgressBar itemCount={5} done={[0, 3]} />
			{/* <LearnGoal />
      <LearnGoalImage/>
      <Question/>
			<Button /> */}
		</div>
	)
}

export default withRouter(AfterPreTest)
