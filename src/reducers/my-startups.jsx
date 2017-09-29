import { mergeData } from '../services/utils'

import {
  MERGE_MY_STARTUPS,
  RESET_MY_STARTUPS,
} from '../actions/my/startups'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_MY_STARTUPS:
      return action.reset ? action.data : mergeData(state, action.data)
    case RESET_MY_STARTUPS:
      return initialState
  }
  return state
}
