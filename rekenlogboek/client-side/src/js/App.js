import '../scss/App.scss'
import Header from '../js/common/components/Header'

function App() {
	const buttonHandler = e => alert('clickkkk.....')
	return (
		<div className="app">
			<Header />
			<main>
				{/* Router here  */}
			</main>
		</div>
	)
}

export default App
