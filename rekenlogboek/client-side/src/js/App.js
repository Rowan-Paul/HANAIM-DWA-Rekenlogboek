import '../scss/App.scss'
import Header from '../js/common/components/Header'
import Jumbotron from '../js/common/components/Jumbotron'
import InfoContainer from '../js/common/components/InfoContainer'
import ButtonContainer from '../js/common/components/ButtonContainer'
import Button from '../js/common/components/Button'

function App() {
	const buttonHandler = e => alert('clickkkk.....')
	return (
		<div className="app">
			<Header />
			<main>
				{/* Router here  */}

				<Jumbotron>
					<ButtonContainer
						icon="archive"
						description="Het overzicht van alle logboeken bekijken."
					>
						<Button color="blue" value="archiveer" handler={buttonHandler} />
					</ButtonContainer>
					<InfoContainer />
				</Jumbotron>
			</main>
		</div>
	)
}

export default App
