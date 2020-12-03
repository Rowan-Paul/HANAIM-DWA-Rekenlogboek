import React from 'react'

export default function ProgressBar(props) {
	const getItems = () => {
		const items = []
		for (let i = 0; i < props.itemCount; i++) {
			items.push(
				<div
					//the ?. syntax prevents errors when the binding is undefined
					className={`square 
            ${props.done.includes(i) && 'done'} 
            ${props?.locked?.includes(i) && 'locked'}`}
				>
					{i}
				</div>
			)
		}
		return items
	}

	return <div className="progress-bar">{getItems()}</div>
}
