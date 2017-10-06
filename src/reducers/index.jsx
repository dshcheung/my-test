import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { RESET_ALL_STATE } from '../actions/session'

import immovablesReducer from './immovables'
import myConversationsReducer from './my-conversations'
import myNotificationsReducer from './my-notifications'
import myStartupsReducer from './my-startups'
import paginationReducer from './pagination'
import requestStatusReducer from './request-status'
import sessionReducer from './session'
import startupsReducer from './startups'
import startupReducer from './startup'
import usersReducer from './users'

const appReducer = combineReducers({
  immovables: immovablesReducer,
  myConversations: myConversationsReducer,
  myNotifications: myNotificationsReducer,
  myStartups: myStartupsReducer,
  pagination: paginationReducer,
  requestStatus: requestStatusReducer,
  session: sessionReducer,
  startups: startupsReducer,
  startup: startupReducer,
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
