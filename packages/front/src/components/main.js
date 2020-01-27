import React from 'react'
// import { withRouter } from 'react-router-dom'
import pt from 'prop-types'
// import { logout } from './../../services/auth'
// import Header from '../../components/Header'

const Main = props => {
  return (
    <>
      {/* <Header /> */}
      <h1>TESTE MAIN PAGE</h1>
    </>
  )
}

Main.propTypes = {
  history: pt.shape({
    push: pt.func
  })
}

export default Main
