import { mergeData } from '../services/utils'

import {
  MERGE_STARTUPS,
  RESET_STARTUPS,
} from '../actions/startups'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_STARTUPS:
      return action.reset ? action.data : mergeData(state, action.data)
    case RESET_STARTUPS:
      return initialState
  }
  return state
}
