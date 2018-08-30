import { mergeAttribute } from '../../services/utils'

import {
  SET_CAMPAIGN,
  RESET_CAMPAIGN,
  MERGE_CAMPAIGN_ATTRIBUTE
} from '../../actions/campaigns'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CAMPAIGN:
      return action.data
    case RESET_CAMPAIGN:
      return initialState
    case MERGE_CAMPAIGN_ATTRIBUTE: {
      return mergeAttribute(state, action)
    }
  }

  return state
}
