import axios from 'axios'

const callApiToken = async (token, email) => {
	if (process.env.REACT_APP_USE_MOCK) return { status: 200, data: { token: 'MOCK' } }
	let config = {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json'
		},
		params: {
			login: `${email}${process.env.REACT_APP_SUFFIX_LOGIN}`
		}
	}

	try {
		const response = await apiToken.get('/v1/colaboradores', config)

		return response
	} catch (err) {
		return err.response
	}
}

const apiToken = axios.create({
	baseURL: 'https://api-colaboradores-corporativo.apps.grupofleury.com.br'
})

apiToken.interceptors.response.use(
	response => response,
	error => Promise.reject(error)
)

export default callApiToken
