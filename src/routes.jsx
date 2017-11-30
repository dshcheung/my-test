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
import VerifyInvestorStatusContainer from './components/_pages/verify/investor-status'

import MyContainer from './components/_pages/my/wrapper'
import MyConversationsIndexContainer from './components/_pages/my/conversations'
import MyNotificationsIndexContainer from './components/_pages/my/notifications/index'
import MyStartupsIndexContainer from './components/_pages/my/startups'
import MySettingsContainer from './components/_pages/my/settings'

import UsersShowContainer from './components/_pages/users/show'

import StartupsIndexContainer from './components/_pages/startups/index'
import StartupsShowContainer from './components/_pages/startups/show'

import PageNotFound from './components/_pages/not-found'

// TODO
// Portfolio -> Campaigns Index

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
      <Route path="investor_status" component={VerifyInvestorStatusContainer} />
    </Route>

    <Route path="my" component={MyContainer}>
      <Route path="conversations" component={MyConversationsIndexContainer} />

      <Route path="notifications">
        <IndexRoute component={MyNotificationsIndexContainer} />
        <Route path=":notificationID" />
      </Route>

      <Route path="portfolio" />

      <Route path="startups" component={MyStartupsIndexContainer} />

      <Route path="campaigns">
        <Route path="new" />
        <Route path=":campaignID" />
      </Route>

      <Route path="settings" component={MySettingsContainer} />
    </Route>

    <Route path="users">
      <Route path=":userID" component={UsersShowContainer} />
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
