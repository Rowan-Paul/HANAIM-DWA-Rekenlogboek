import '../scss/App.scss'
import Header from '../js/common/components/Header'
import SignIn from '../js/sign-in/SignIn'
import Demo from '../js/demo/Demo'

function App() {
	const buttonHandler = e => alert('clickkkk.....')
	return (
		<div className="app">
			<Header />
			<main>
				<Demo />
				{/* Router here  */}
			</main>
		</div>
	)
}

export default App
