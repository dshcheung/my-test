import { mergeData } from '../../services/utils'

import {
  MERGE_CAMPAIGNS,
  RESET_CAMPAIGNS,
} from '../../actions/campaigns'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_CAMPAIGNS:
      return action.reset ? action.data : mergeData(state, action.data)
    case RESET_CAMPAIGNS:
      return initialState
  }
  return state
}
