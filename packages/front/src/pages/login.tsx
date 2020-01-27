import React, { useState } from 'react'
// import { withRouter } from 'react-router-dom'
import pt from 'prop-types'
import { useForm } from '../hooks'
import { sessionSetToken, setCredentials } from '../services/auth'
import callApiLogin from '../services/api-login'
import { Loader } from '../components/Loader'
import { navigate } from 'gatsby'

const Login = props => {
  const [values, handleChange] = useForm({
    login: '',
    password: ''
  })

  // if (getCredentials().login !== null && getCredentials().password !== null) {
  // 	values.login = atob(getCredentials().login)
  // 	values.password = atob(getCredentials().password)
  // }

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  let loginAttempt = 0
  const handleLogin = async e => {
    loginAttempt += 1
    e.preventDefault()
    setLoading(true)
    if (!values.login || !values.password) {
      setError('Por favor, preencha e-mail e senha para continuar.')
      setLoading(false)
    } else {
      callApiLogin(values).then(response => {
        setLoading(false)
        if (response.status === 200) {
          if (response.data.token) {
            if (window) {
              sessionSetToken(response.data.token)
              setCredentials(values)
              navigate('/main')
            } //navigate('/erro')
            else
              setError(
                'Houve um problema com o login, verifique suas credenciais.'
              )
          }
        } else if (response.status === 401 && loginAttempt < 2) {
          handleLogin(e)
        } else {
          loginAttempt = 0
          setError('Houve um problema com o login, verifique suas credenciais.')
        }
      })
    }
  }

  if (error != '') {
    alert(error)
    setError('')
  }

  return (
    <>
      {loading && <Loader />}
      <div className='w-full h-screen bg-gray-800 flex justify-center items-center'>
        <form
          onSubmit={handleLogin}
          action=''
          className='flex flex-col h-64 bg-white shadow-md rounded px-8 py-8 pt-8 items-center'
        >
          <div className='px-4 pb-4'>
            <label htmlFor='login' className='text-sm block font-bold  pb-2'>
              Login
            </label>
            <input
              type='string'
              id='login'
              name='login'
              value={values.login}
              onChange={handleChange}
              error={error !== ''}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 '
              placeholder='Usuário da rede'
            />
          </div>
          <div className='px-4 pb-4'>
            <label htmlFor='password' className='text-sm block font-bold pb-2'>
              Senha
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              error={error !== ''}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300'
              placeholder='Senha de rede'
            />
          </div>
          <div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

Login.propTypes = {
  history: pt.shape({
    push: pt.func
  })
}

export default Login
