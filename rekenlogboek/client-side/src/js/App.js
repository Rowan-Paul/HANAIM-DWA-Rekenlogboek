import '../scss/App.scss'
import Header from '../js/common/components/Header'
import Jumbotron from '../js/common/components/Jumbotron'
function App() {
	return (
		<div className="app">
			<Header />
			<main>
				{/* Router here  */}
				<Jumbotron />
			</main>
		</div>
	)
}

export default App
