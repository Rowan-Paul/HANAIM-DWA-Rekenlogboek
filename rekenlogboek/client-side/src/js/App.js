import React from 'react'
import Header from '../js/common/components/Header'
import LogbookDesigner from '../js/logbook-designer/LogbookDesigner'
// import SignIn from '../js/sign-in/SignIn'

import '../scss/App.scss'

function App() {
	return (
		<div className="app">
			<Header />
			<main>
				{/* TODO: add router */}
				{/* TODO: move component below in router component */}
				<LogbookDesigner />
			</main>
		</div>
	)
}

export default App
