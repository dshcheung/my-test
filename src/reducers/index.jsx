import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { RESET_ALL_STATE } from '../actions/session'

import paginationReducer from './system/pagination'
import redirectionReducer from './system/redirection'
import requestStatusReducer from './system/request-status'
import sessionReducer from './session'

const appReducer = combineReducers({
  pagination: paginationReducer,
  redirectionInProcess: redirectionReducer,
  requestStatus: requestStatusReducer,
  session: sessionReducer,
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
