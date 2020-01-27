import React, { Suspense, useState } from 'react'
// import { HOME, LOGIN } from './routes'
import { Loader } from '../components/Loader'
import Login from './login'
import { MainPage } from '../components/main'
import pt from 'prop-types'
import { isAuthenticated } from '../services/auth'

function App({ location }) {
  const [authenticated, setAuthenticated] = useState('checking')
  const checkAuthentication = async () => {
    const authenticateChecked = await isAuthenticated()
    setAuthenticated(String(authenticateChecked))
  }

  checkAuthentication()

  //   const PrivateRoute = ({ component: Component, ...rest }) => {
  //     PrivateRoute.propTypes = {
  //       component: pt.node
  //     }

  //     if (authenticated !== 'checking') {
  //       return (
  //         <Route
  //           {...rest}
  //           render={props =>
  //             authenticated === 'true' ? (
  //               <Component {...props} />
  //             ) : (
  //               <Redirect
  //                 to={{ pathname: LOGIN, state: { from: props.location } }}
  //               />
  //             )
  //           }
  //         />
  //       )
  //     } else {
  //       return null
  //     }
  //   }

  //   if (authenticated === 'true' && location.pathname === LOGIN) {
  //     return <Redirect to={HOME} />
  //   }

  return (
    <Suspense fallback={<Loader />}>
      {/* <Switch>
        <Route path={LOGIN} component={Login} />
        <PrivateRoute component={MainPage} />
        <Route path='*' component={() => <h3>Página não encontrada...</h3>} />
      </Switch> */}
      <Login />
    </Suspense>
  )
}

App.propTypes = {
  location: pt.object.isRequired
}

export default App
