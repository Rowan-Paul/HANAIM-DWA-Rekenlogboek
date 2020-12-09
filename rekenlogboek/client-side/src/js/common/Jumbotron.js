import React from 'react'
import '../../scss/common/Jumbotron.scss'
import classNames from 'classnames'
export default function Jumbotron(props) {
	const colCount = `columns-${props.columns}`
	return (
		<section className={classNames('Jumbotron', { [colCount]: true })}>
			{props.children}
		</section>
	)
}
