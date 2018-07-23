import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import App from './components/_layouts/app'

import AuthContainer from './components/_pages/auth/wrapper'
import LoginContainer from './components/_pages/auth/login'
import SignupContainer from './components/_pages/auth/signup'
import SignupInvestorContainer from './components/_pages/auth/signup-investor'
import SignupStartupContainer from './components/_pages/auth/signup-startup'
import ForgotPasswordContainer from './components/_pages/auth/forgot-password'
import ResetPasswordContainer from './components/_pages/auth/reset-password'

import InPersonValidationContainer from './components/_pages/in-person-validation'

import VerifyContainer from './components/_pages/verify'

import MyWrapperContainer from './components/_pages/my/wrapper'

import MySettingsContainer from './components/_pages/my/settings'

import MyProfileSuitability from './components/_pages/my/profile-suitability'
import MyPortfolioContainer from './components/_pages/my/portfolio'

import MyCampaignsWrapperContainer from './components/_pages/my/campaigns/wrapper'
import MyCampaignsIndexContainer from './components/_pages/my/campaigns/index'
import MyCampaignsNewContainer from './components/_pages/my/campaigns/new'
import MyCampaignsShowWrapperContainer from './components/_pages/my/campaigns/show-wrapper'
import MyCampaignsShowContainer from './components/_pages/my/campaigns/show'
import MyCampaignsEditContainer from './components/_pages/my/campaigns/edit'

import MyDashboardContainer from './components/_pages/my/dashboard'

import CampaignsContainer from './components/_pages/campaigns/wrapper'
import CampaignsIndexContainer from './components/_pages/campaigns/index'
import CampaignsShowContainer from './components/_pages/campaigns/show'

import LegalDocumentContainer from './components/_pages/legal-document'

import PageNotFound from './components/_pages/not-found'

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/auth/login" />

    {/* Auth Paths */}
    <Route path="auth" component={AuthContainer}>
      <Route path="login" component={LoginContainer} />
      <Route path="signup" component={SignupContainer} />
      <Route path="signup-investor" component={SignupInvestorContainer} />
      <Route path="signup-startup" component={SignupStartupContainer} />
      <Route path="forgot-password" component={ForgotPasswordContainer} />
      <Route path="reset-password" component={ResetPasswordContainer} />
    </Route>

    <Route path="in-person-validation" component={InPersonValidationContainer} barebone />

    {/* Verify Paths */}
    <Route path="verify" component={VerifyContainer} />

    {/* My Paths */}
    <Route path="my" component={MyWrapperContainer}>
      {/* Shared Paths */}
      <Route path="settings" component={MySettingsContainer} />

      {/* Investor Paths */}
      <Route path="profile-suitability" component={MyProfileSuitability} roleAccess="Investor" />
      <Route path="portfolio" component={MyPortfolioContainer} roleAccess="Investor" />

      {/* StartupUser Paths */}
      <Route path="campaigns" component={MyCampaignsWrapperContainer} roleAccess="StartupUser">
        <IndexRoute component={MyCampaignsIndexContainer} />
        <Route path="new" component={MyCampaignsNewContainer} />
        <Route path=":myCampaignID" component={MyCampaignsShowWrapperContainer}>
          <IndexRoute component={MyCampaignsShowContainer} />
          <Route path="edit/:tab" component={MyCampaignsEditContainer} />
        </Route>
      </Route>
      <Route path="dashboard" component={MyDashboardContainer} roleAccess="StartupUser" />
    </Route>

    {/* Investor Paths */}
    <Route path="campaigns" component={CampaignsContainer}>
      <IndexRoute component={CampaignsIndexContainer} />
      <Route path=":campaignID" component={CampaignsShowContainer} />
    </Route>

    <Route path="terms" component={LegalDocumentContainer} docID="terms-of-service" />
    <Route path="privacy" component={LegalDocumentContainer} docID="privacy-policy" />
    <Route path="fair-dealing-policy" component={LegalDocumentContainer} docID="fair-dealing-policy" />
    <Route path="investor-agreement" component={LegalDocumentContainer} docID="investor-agreement" />
    <Route path="investor-disclaimer" component={LegalDocumentContainer} docID="investor-warning-statement" />

    <Route path="about" />
    <Route path="learn" />

    <Route path="*" component={PageNotFound} />
  </Route>
)
