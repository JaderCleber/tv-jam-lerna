import callApiToken from './validate-token'

export const TOKEN_KEY = '@backoffice-Token'
export const USER_LOGIN = '@backoffice-Email'
export const USER_PASSWORD = '@backoffice-Password'

// Token
export const isAuthenticated = async () => {
  if (!window.localStorage.getItem(TOKEN_KEY)) return false

  const response = await callApiToken(
    window.localStorage.getItem(TOKEN_KEY),
    window.localStorage.getItem(USER_LOGIN)
  )
  return response.status === 200
}

export const getToken = () => window.localStorage.getItem(TOKEN_KEY)
export const sessionSetToken = token => {
  window.localStorage.setItem(TOKEN_KEY, token)
}
export const logout = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

// Credentials (email, password)
export const setCredentials = credentials => {
  window.localStorage.setItem(USER_LOGIN, credentials.login)
  window.localStorage.setItem(USER_PASSWORD, credentials.password)
}
export const getCredentials = () => ({
  login: window.localStorage.getItem(USER_LOGIN),
  password: window.localStorage.getItem(USER_PASSWORD)
})
export const clearCredentials = () => {
  window.localStorage.removeItem(USER_LOGIN)
  window.localStorage.removeItem(USER_PASSWORD)
}
