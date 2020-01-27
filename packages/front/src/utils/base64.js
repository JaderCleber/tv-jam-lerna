const base64 = require('base-64')
const utf8 = require('utf8')

const encodeBase64 = str => {
	const bytes = utf8.encode(str)
	return base64.encode(bytes)
}

export { encodeBase64 }
