import React from 'react'
import '../../scss/common/Jumbotron.scss'
export default function Jumbotron(props) {
	return <section className="Jumbotron">{props.children}</section>
}
