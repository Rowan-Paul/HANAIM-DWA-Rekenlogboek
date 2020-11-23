import '../scss/App.scss'
import Header from '../js/common/components/Header'
import SignIn from '../js/sign-in/SignIn'
function App() {
	const buttonHandler = e => alert('clickkkk.....')
	return (
		<div className="app">
			<Header />
			<main>
				<SignIn />
			</main>
		</div>
	)
}

export default App
