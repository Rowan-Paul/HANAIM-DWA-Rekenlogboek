import React from 'react'
import classNames from 'classnames'
import shortid from 'shortid'

import '../../../scss/student/components/ProgressBar.scss'

export default function ProgressBar(props) {
	const getItems = () => {
		const items = []
		for (let i = 0; i < props.itemCount; i++) {
			items.push(
				<div
					//the ?. syntax prevents errors when the binding is undefined
					className={classNames(`square square-${i + 1}`, {
						done: props.done.includes(i),
						locked: props?.locked?.includes(i)
					})}
					key={shortid.generate()}
					onClick={
						props.changeHandler ? () => props.changeHandler(i) : () => {}
					}
				>
					{/* start from 1 */}
					{i + 1}
				</div>
			)
		}
		return items
	}

	return <div className="progress-bar">{getItems()}</div>
}
