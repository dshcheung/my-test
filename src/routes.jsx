import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/_layouts/app'

import HomeContainer from './components/_pages/home'

import LoginContainer from './components/_pages/auth/login'
import SignupContainer from './components/_pages/auth/signup'

import StartupsIndexContainer from './components/_pages/startups/index'
import StartupsShowContainer from './components/_pages/startups/show'

import PageNotFound from './components/_pages/not-found'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="auth">
      <Route path="login" component={LoginContainer} />
      <Route path="signup" component={SignupContainer} />
    </Route>

    <Route path="startups">
      <IndexRoute component={StartupsIndexContainer} />
      <Route path=":startupID" component={StartupsShowContainer} />
    </Route>

    <Route path="*" component={PageNotFound} />
  </Route>
)
