import { mergeData } from '../services/utils'

import {
  SET_MY_DASHBOARD,
  RESET_MY_DASHBOARD,
} from '../actions/my/dashboard'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_DASHBOARD:
      if (action.reset) {
        return action.data
      } else {
        return { ...state, campaigns: mergeData(_.get(state, 'campaigns') || [], action.data.campaigns) }
      }
    case RESET_MY_DASHBOARD:
      return initialState
  }
  return state
}
