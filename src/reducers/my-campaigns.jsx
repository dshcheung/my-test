import { mergeData } from '../services/utils'

import {
  MERGE_MY_CAMPAIGNS,
  RESET_MY_CAMPAIGNS,
} from '../actions/my/campaigns'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_MY_CAMPAIGNS:
      return action.reset ? action.data : mergeData(action.data, state)
    case RESET_MY_CAMPAIGNS:
      return initialState
  }
  return state
}
