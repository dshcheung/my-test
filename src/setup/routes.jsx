import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../components/_layouts/app'

import HomeContainer from '../components/_pages/others/home'

import AuthContainer from '../components/_pages/auth/wrapper'
import LoginContainer from '../components/_pages/auth/login'
import ForgotPasswordContainer from '../components/_pages/auth/forgot-password'
import ResetPasswordContainer from '../components/_pages/auth/reset-password'
import SignupContainer from '../components/_pages/auth/signup'
import SignupStartupContainer from '../components/_pages/auth/signup-startup'
import SignupInvestorContainer from '../components/_pages/auth/signup-investor'

import VerifyContainer from '../components/_pages/verify/index'

import MyWrapperContainer from '../components/_pages/my/wrapper'

import MyCampaignsIndexContainer from '../components/_pages/my/campaigns/index'
import MyCampaignsNewContainer from '../components/_pages/my/campaigns/new'

import MyCampaignsShowWrapperContainer from '../components/_pages/my/campaigns/show-wrapper'
import MyCampaignsEditContainer from '../components/_pages/my/campaigns/edit'

import MyDashboardContainer from '../components/_pages/my/dashboard'

import MyInvestorValidationsIndexContainer from '../components/_pages/my/investor-validations/index'
import MyInvestorValidationsVerificationContainer from '../components/_pages/my/investor-validations/verification'
import MyInvestorValidationsSuitabilityWrapperContainer from '../components/_pages/my/investor-validations/suitability-wrapper'
import MyInvestorValidationsAMLWrapperContainer from '../components/_pages/my/investor-validations/aml-wrapper'

import InPersonValidationContainer from '../components/_pages/others/in-person-validation'

import PageNotFound from '../components/_pages/others/not-found'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} optClass="px-0" />

    <Route path="auth" component={AuthContainer}>
      <Route path="login" component={LoginContainer} />
      <Route path="forgot-password" component={ForgotPasswordContainer} />
      <Route path="reset-password" component={ResetPasswordContainer} />

      <Route path="signup" component={SignupContainer} />
      <Route path="signup-startup" component={SignupStartupContainer} />
      <Route path="signup-investor" component={SignupInvestorContainer} />
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

      <Route path="investor-validations" roleAccess="Investor">
        <IndexRoute component={MyInvestorValidationsIndexContainer} />
        <Route path="verification" component={MyInvestorValidationsVerificationContainer} />
        <Route path="suitability/:tab" component={MyInvestorValidationsSuitabilityWrapperContainer} />
        <Route path="aml/:tab" component={MyInvestorValidationsAMLWrapperContainer} />
      </Route>

      <Route path="portfolio" roleAccess="Investor" />
    </Route>

    <Route path="in-person-validation" component={InPersonValidationContainer} barebone />

    <Route path="blank" barebone />

    <Route path="*" component={PageNotFound} />
  </Route>
)
