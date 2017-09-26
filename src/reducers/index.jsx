import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { RESET_ALL_STATE } from '../actions/session'

import immovablesReducer from './immovables'
import paginationReducer from './pagination'
import requestStatusReducer from './request-status'
import sessionReducer from './session'
import startupsReducer from './startups'
import usersReducer from './users'

const appReducer = combineReducers({
  immovables: immovablesReducer,
  pagination: paginationReducer,
  requestStatus: requestStatusReducer,
  session: sessionReducer,
  startups: startupsReducer,
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
