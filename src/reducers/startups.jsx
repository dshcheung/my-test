import { mergeData } from '../services/utils'

import {
  MERGE_STARTUPS,
  RESET_STARTUPS,
  SET_STARTUP,
  RESET_STARTUP
} from '../actions/startups'

const initialState = {
  index: [],
  show: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_STARTUPS:
      return action.reset ? {
        ...state,
        index: action.data
      } : {
        ...state,
        index: mergeData(state.index, action.data)
      }
    case RESET_STARTUPS:
      return { ...state, index: initialState.index }
    case SET_STARTUP:
      return { ...state, show: action.data }
    case RESET_STARTUP:
      return { ...state, show: initialState.show }
  }
  return state
}
