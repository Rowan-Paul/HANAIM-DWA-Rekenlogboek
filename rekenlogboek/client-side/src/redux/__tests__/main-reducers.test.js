import reducer from '../main/reducer'
import * as types from '../main/types'

describe('main reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({ user: {} })
	})

	it('should handle SAVE_USER', () => {
		expect(
			reducer([], {
				type: types.SAVE_USER,
				payload: {
					name: 'Bram Konijn',
					jobTitle: 'Leraar',
					email: 'BKonijn@teamjaguarundi.onmicrosoft.com',
					groups: ['Logboekontwerpers', 'Groep 6', 'teamjaguarundi']
				}
			})
		).toEqual({
			user: {
				name: 'Bram Konijn',
				jobTitle: 'Leraar',
				email: 'BKonijn@teamjaguarundi.onmicrosoft.com',
				groups: ['Logboekontwerpers', 'Groep 6', 'teamjaguarundi']
			}
		})
	})
})
