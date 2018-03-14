import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/_layouts/app'

// import HomeContainer from './components/_pages/home'

import AuthContainer from './components/_pages/auth/wrapper'
import LoginContainer from './components/_pages/auth/login'
import SignupContainer from './components/_pages/auth/signup'
import ForgotPasswordContainer from './components/_pages/auth/forgot-password'
import ResetPasswordContainer from './components/_pages/auth/reset-password'

import VerifyContainer from './components/_pages/verify/wrapper'
import VerifyEmailContainer from './components/_pages/verify/email'
import VerifyMobileContainer from './components/_pages/verify/mobile'

import MyContainer from './components/_pages/my/wrapper'

import MySettingsContainer from './components/_pages/my/settings'
import MyConversationsIndexContainer from './components/_pages/my/conversations'
import MyNotificationsIndexContainer from './components/_pages/my/notifications/index'

import MyQuestionnairesContainer from './components/_pages/my/questionnaires'
import MyAMLContainer from './components/_pages/my/aml'
import MyPortfolioContainer from './components/_pages/my/portfolio'

import MyCampaignsContainer from './components/_pages/my/campaigns/wrapper'
import MyCampaignsIndexContainer from './components/_pages/my/campaigns/index'
import MyCampaignsNewContainer from './components/_pages/my/campaigns/new'
import MyCampaignsShowWrapperContainer from './components/_pages/my/campaigns/show-wrapper'
import MyCampaignsEditContainer from './components/_pages/my/campaigns/edit'
import MyCampaignsShowContainer from './components/_pages/my/campaigns/show'

import MyDashboardContainer from './components/_pages/my/dashboard'

import CampaignsContainer from './components/_pages/campaigns/wrapper'
import CampaignsIndexContainer from './components/_pages/campaigns/index'
import CampaignsShowContainer from './components/_pages/campaigns/show'

import LegalDocumentContainer from './components/_pages/legal-document'

import UsersShowContainer from './components/_pages/users/show'

import PageNotFound from './components/_pages/not-found'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginContainer} />

    {/* Auth Paths */}
    <Route path="auth" component={AuthContainer}>
      <Route path="login" component={LoginContainer} />
      <Route path="signup" component={SignupContainer} />
      <Route path="forgot-password" component={ForgotPasswordContainer} />
      <Route path="reset-password" component={ResetPasswordContainer} />
    </Route>

    {/* Verify Paths */}
    <Route path="verify" component={VerifyContainer}>
      <Route path="email" component={VerifyEmailContainer} />
      <Route path="mobile" component={VerifyMobileContainer} />
    </Route>

    {/* My Paths */}
    <Route path="my" component={MyContainer}>
      {/* Shared Paths */}
      <Route path="settings" component={MySettingsContainer} />
      <Route path="conversations" component={MyConversationsIndexContainer} />
      <Route path="notifications">
        <IndexRoute component={MyNotificationsIndexContainer} />
        <Route path=":notificationID" />
      </Route>

      {/* Investor Paths */}
      <Route path="kyc" component={MyQuestionnairesContainer} roleAccess="Investor" />
      <Route path="aml" component={MyAMLContainer} roleAccess="Investor" />
      <Route path="portfolio" component={MyPortfolioContainer} roleAccess="Investor" />

      {/* StartupUser Paths */}
      <Route path="campaigns" component={MyCampaignsContainer} roleAccess="StartupUser">
        <IndexRoute component={MyCampaignsIndexContainer} />
        <Route path="new" component={MyCampaignsNewContainer} />
        <Route component={MyCampaignsShowWrapperContainer}>
          <Route path=":myCampaignID/edit" component={MyCampaignsEditContainer} />
          <Route path=":myCampaignID" component={MyCampaignsShowContainer} />
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

    {/* TODO: REMOVE? */}
    <Route path="users">
      <Route path=":userID" component={UsersShowContainer} />
    </Route>

    <Route path="about" />
    <Route path="learn" />

    <Route path="*" component={PageNotFound} />
  </Route>
)
