import axios from 'axios'
import handleUnauthorized from './oauth-sensedia'
import { encodeBase64 } from '../utils/base64'

const callApiLogin = async values => {
	try {
		console.log('callapilogin', process.env.REACT_API_USE_MOCK)
		// Fluxo de mock para não depender da API de colaboradores
		if (process.env.REACT_APP_USE_MOCK) return { status: 200, data: { token: 'MOCK' } }
		const response = await apiLogin.post(
			'/identidade/corporativo/v1/colaboradores/login',
			{
				login: encodeBase64(values.login),
				password: encodeBase64(values.password)
			},
			{
				headers: {
					access_token: sessionStorage.getItem('access_token')
				}
			}
		)

		return response
	} catch (err) {
		return err.response
	}
}

const apiLogin = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		client_id: process.env.REACT_APP_SENSEDIA_CLIENT_ID
	}
})

apiLogin.interceptors.response.use(
	response => response,
	error => handleUnauthorized(error)
)

export default callApiLogin
