import React from 'react'
import '../../../scss/common/components/Header.scss'
export default function Header() {
	return (
		<header>
			<div className="return">
				<i className="fa fa-chevron-left"></i>
				<span>Vorige</span>
			</div>
			<div className="title">
				<span>Title</span>
			</div>
			<div className="user">
				<span>John doe</span>
			</div>
		</header>
	)
}
