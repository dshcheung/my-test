import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { RESET_ALL_STATE } from '../actions/session'

import campaignReducer from './campaign'
import campaignsReducer from './campaigns'
import immovablesReducer from './immovables'
import myCampaignReducer from './my-campaign'
import myCampaignsReducer from './my-campaigns'
import myConversationsReducer from './my-conversations'
import myDashboardReducer from './my-dashboard'
import myNotificationsReducer from './my-notifications'
import myProfileSuitabilityReducer from './my-profile-suitability'
import myQuestionnairesReducers from './my-questionnaires'
import myStartupQuestionnairesReducers from './my-startup-questionnaires'
import paginationReducer from './pagination'
import redirectionReducer from './redirection'
import requestStatusReducer from './request-status'
import sessionReducer from './session'
import usersReducer from './users'

const appReducer = combineReducers({
  campaign: campaignReducer,
  campaigns: campaignsReducer,
  immovables: immovablesReducer,
  myCampaign: myCampaignReducer,
  myCampaigns: myCampaignsReducer,
  myConversations: myConversationsReducer,
  myDashboard: myDashboardReducer,
  myNotifications: myNotificationsReducer,
  myProfileSuitability: myProfileSuitabilityReducer,
  myQuestionnaires: myQuestionnairesReducers,
  myStartupQuestionnaires: myStartupQuestionnairesReducers,
  pagination: paginationReducer,
  redirectionInProcess: redirectionReducer,
  requestStatus: requestStatusReducer,
  session: sessionReducer,
  user: usersReducer,
  routing: routerReducer,
  form: formReducer
})

export default (state, action) => {
  let newState = { ...state }

  if (action.type === RESET_ALL_STATE) {
    newState = {
      requestStatus: state.requestStatus,
      routing: state.routing,
      form: state.form
    }
  }

  return appReducer(newState, action)
}
