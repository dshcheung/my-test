import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/_layouts/app'

import HomeContainer from './components/_pages/home'

import AuthContainer from './components/_pages/auth/wrapper'
import LoginContainer from './components/_pages/auth/login'
import SignupContainer from './components/_pages/auth/signup'
import ForgotPasswordContainer from './components/_pages/auth/forgot-password'
import ResetPasswordContainer from './components/_pages/auth/reset-password'

import VerifyEmailContainer from './components/_pages/verify/email'
import VerifyMobileContainer from './components/_pages/verify/mobile'

import StartupsIndexContainer from './components/_pages/startups/index'
import StartupsShowContainer from './components/_pages/startups/show'

import PageNotFound from './components/_pages/not-found'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />

    <Route path="auth" component={AuthContainer}>
      <Route path="login" component={LoginContainer} />
      <Route path="signup" component={SignupContainer} />
      <Route path="forgot_password" component={ForgotPasswordContainer} />
      <Route path="reset_password" component={ResetPasswordContainer} />
    </Route>

    <Route path="verify">
      <Route path="email" component={VerifyEmailContainer} />
      <Route path="mobile" component={VerifyMobileContainer} />
    </Route>

    <Route path="my">
      <Route path="messages">
        <IndexRoute />
        <Route path=":messageID" />
      </Route>

      <Route path="notifications">
        <IndexRoute />
        <Route path=":notificationID" />
      </Route>

      <Route path="portfolio" />

      <Route path="startups">
        <IndexRoute />
        <Route path="new" />
        <Route path=":startupID" />
      </Route>

      <Route path="campaigns">
        <IndexRoute />
        <Route path=":campaignID" />
      </Route>

      <Route path="settings" />
    </Route>

    <Route path="users">
      <Route path=":userID" />
    </Route>

    <Route path="startups">
      <IndexRoute component={StartupsIndexContainer} />
      <Route path=":startupID" component={StartupsShowContainer} />
    </Route>

    <Route path="campaigns">
      <IndexRoute />
      <Route path=":campaignID" />
    </Route>

    <Route path="about" />
    <Route path="learn" />

    <Route path="*" component={PageNotFound} />
  </Route>
)
