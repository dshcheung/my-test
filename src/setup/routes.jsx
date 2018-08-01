import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import App from '../components/_layouts/app'

import AuthContainer from '../components/_pages/auth/wrapper'
import LoginContainer from '../components/_pages/auth/login'
import ForgotPasswordContainer from '../components/_pages/auth/forgot-password'
import ResetPasswordContainer from '../components/_pages/auth/reset-password'
import SignupContainer from '../components/_pages/auth/signup'
import SignupStartupContainer from '../components/_pages/auth/signup-startup'
import SignupInvestorContainer from '../components/_pages/auth/signup-investor'
import SignupInvestorStep1Container from '../components/_pages/auth/signup-investor-step-1'
import SignupInvestorStep2Container from '../components/_pages/auth/signup-investor-step-2'

import VerifyContainer from '../components/_pages/verify/index'

import MyWrapperContainer from '../components/_pages/my/wrapper'

import MyCampaignsIndexContainer from '../components/_pages/my/campaigns/index'
import MyCampaignsNewContainer from '../components/_pages/my/campaigns/new'

import MyCampaignsShowWrapperContainer from '../components/_pages/my/campaigns/show-wrapper'
import MyCampaignsEditContainer from '../components/_pages/my/campaigns/edit'

import MyDashboardContainer from '../components/_pages/my/dashboard'

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/auth/login" />

    <Route path="auth" component={AuthContainer}>
      <Route path="login" component={LoginContainer} />
      <Route path="forgot-password" component={ForgotPasswordContainer} />
      <Route path="reset-password" component={ResetPasswordContainer} />

      <Route path="signup" component={SignupContainer} />
      <Route path="signup-startup" component={SignupStartupContainer} />
      <Route path="signup-investor" component={SignupInvestorContainer} />
      <Route path="signup-investor-step-1" component={SignupInvestorStep1Container} />
      <Route path="signup-investor-step-2" component={SignupInvestorStep2Container} />
    </Route>

    <Route path="verify" component={VerifyContainer} />

    <Route path="my" component={MyWrapperContainer}>
      <Route path="campaigns" roleAccess="StartupUser">
        <IndexRoute component={MyCampaignsIndexContainer} />
        <Route path="new" component={MyCampaignsNewContainer} />
        <Route path=":myCampaignID" component={MyCampaignsShowWrapperContainer}>
          <Route path="edit/:tab" component={MyCampaignsEditContainer} />
        </Route>
      </Route>

      <Route path="dashboard" component={MyDashboardContainer} roleAccess="StartupUser" />
    </Route>
  </Route>
)
