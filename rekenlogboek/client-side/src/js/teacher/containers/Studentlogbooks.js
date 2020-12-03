import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LogbookList from '../components/LogbookList'
import Jumbotron from '../../common/Jumbotron'

function StudentLogbooks(props) {
	useEffect(() => {}, [])

	return (
		<Jumbotron>
			<LogbookList
				year="2019-2020"
				group={5}
				period={5}
				studentlogbooks={[
					{
						logbookID: '5fbf66ca14b7c811a829fadf',
						student: 'James',
						answers: [
							{
								goalPosition: 1,
								columnPosition: 1,
								answer: {
									inputType: 'string',
									value: 'This is an answer 1',
									boolean: true
								}
							},
							{
								goalPosition: 1,
								columnPosition: 2,
								answer: {
									inputType: 'string',
									value: 'This is an answer 2',
									boolean: true
								}
							},
							{
								goalPosition: 2,
								columnPosition: 1,
								answer: {
									inputType: 'string',
									value: 'This is an answer 3',
									boolean: true
								}
							}
						]
					},
					{
						logbookID: '5fbf66ca14b7c811a829fadf',
						student: 'James',
						answers: [
							{
								goalPosition: 1,
								columnPosition: 1,
								answer: {
									inputType: 'string',
									value: 'This is an answer 1',
									boolean: true
								}
							},
							{
								goalPosition: 1,
								columnPosition: 2,
								answer: {
									inputType: 'string',
									value: 'This is an answer 2',
									boolean: true
								}
							},
							{
								goalPosition: 2,
								columnPosition: 1,
								answer: {
									inputType: 'string',
									value: 'This is an answer 3',
									boolean: true
								}
							}
						]
					}
				]}
			></LogbookList>
		</Jumbotron>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StudentLogbooks))
