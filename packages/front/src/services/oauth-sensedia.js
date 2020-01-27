import axios from 'axios'
const qs = require('qs')

const grantCode = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

grantCode.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

const handleUnauthorized = async error => {
  if (error.response.status === 401) {
    const refreshedToken = await refreshToken()
    return Promise.reject({
      response: { tokenRefreshed: refreshedToken, status: 401 }
    })
  } else {
    return Promise.reject(error)
  }
}

const callGrantCode = async () => {
  try {
    const response = await grantCode.post(
      '/oauth/grant-code',
      {
        client_id: process.env.REACT_APP_SENSEDIA_CLIENT_ID,
        redirect_uri: `${process.env.REACT_APP_API_URL}/oauth/access-token`
      },
      {
        headers: {
          access_token: sessionStorage.getItem('access_token')
        }
      }
    )

    return response
  } catch (err) {
    return err
  }
}

const accessToken = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    client_id: process.env.REACT_APP_SENSEDIA_CLIENT_ID,
    Authorization: process.env.REACT_APP_SENSEDIA_AUTHORIZATION
  }
})

accessToken.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

const callAccessToken = async code => {
  try {
    const response = await accessToken.post(
      '/oauth/access-token',
      qs.stringify({
        grant_type: 'authorization_code',
        code: code
      })
    )

    return response
  } catch (err) {
    return err
  }
}

const refreshToken = () =>
  new Promise(resp => {
    callGrantCode().then(response => {
      if (response.status === 201) {
        callAccessToken(getCode(response.data.redirect_uri)).then(response => {
          if (response.status === 201) {
            sessionStorage.setItem('access_token', response.data.access_token)
            resp(true)
          } else {
            resp(false)
          }
        })
      } else {
        resp(false)
      }
    })
  })

const getCode = redirect_uri => {
  const url = `${process.env.REACT_APP_API_URL}/oauth/access-token?code=`
  return redirect_uri.substring(url.length, redirect_uri.length)
}

export default handleUnauthorized
