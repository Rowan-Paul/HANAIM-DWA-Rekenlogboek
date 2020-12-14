/**
 * @jest-environment node
 */

import * as actions from '../main/actions'
import * as types from '../main/types'

describe('main reducer actions', () => {
	it('should decrypt the user object', () => {
		const objEnc =
			'd0e43f9b5411dbbf48b2292d05ddab934c8f5f3385e768895752a279620cf8af927937b143d36eee2ebabfd0b9385e4cC0R5P1xo+RiyKVBV85fbL3uraKx9HJ2ghJjq3IMUR2oMQpv25owORB+/rZKC9/m3kQY8b3aezyofyqwfMsiuHQbbAPYTtSgtIl6v0AI3x14Cn0HXfyEoioJ+cwrYrmNUCPqwvVtqRCSLkSy0yWSZlcXO1VNKs4OLt0squp0/L9m04sJf9Nd7TuT2plBo2Q0IsKOjw42bf3U6X7Wilt+yPQ=='
		const payload = {
			name: 'Bram Konijn',
			jobTitle: 'Leraar',
			email: 'BKonijn@teamjaguarundi.onmicrosoft.com',
			groups: ['Logboekontwerpers', 'Groep 6', 'teamjaguarundi']
		}
		const expectedAction = {
			type: types.SAVE_USER,
			payload
		}
		expect(actions.saveUserAction(objEnc)).toEqual(expectedAction)
	})

	test('should throw an error', () => {
		expect(() => actions.saveUserAction(undefined)).toThrow()
	})
})
