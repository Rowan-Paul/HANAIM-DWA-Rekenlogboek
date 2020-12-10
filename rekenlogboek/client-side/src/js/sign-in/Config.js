//TODO: replace it with env variable`
export const config = {
	clientId: 'e1c0b43f-30fc-491a-ada6-d5edb53b56f3',
	redirectUri: process.env.REACT_APP_ADDRESS + '/auth',
	scopes: ['user.read']
}
