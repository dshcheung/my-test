import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import App from '../components/_layouts/app'

import AuthContainer from '../components/_pages/auth/wrapper'
import LoginContainer from '../components/_pages/auth/login'

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/auth/login" />

    <Route path="auth" component={AuthContainer}>
      <Route path="login" component={LoginContainer} />
    </Route>
  </Route>
)
