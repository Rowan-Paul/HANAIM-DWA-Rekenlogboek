import React from 'react'
import classNames from 'classnames'

import '../../../scss/student/components/ProgressBar.scss'

export default function ProgressBar(props) {
	const getItems = () => {
		const items = []
		// changed i to 1, so we don't have to i+1
		// underneath here (and gave itemCount 1 so it
		// does actually go long enough)
		for (let i = 1; i < props.itemCount + 1; i++) {
			items.push(
				<div
					//the ?. syntax prevents errors when the binding is undefined
					className={classNames('square', {
						done: props.done.includes(i),
						locked: props?.locked?.includes(i)
					})}
				>
					{i}
				</div>
			)
		}
		return items
	}

	return <div className="progress-bar">{getItems()}</div>
}
