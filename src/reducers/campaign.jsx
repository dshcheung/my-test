import { mergeAttribute } from '../services/utils'

import {
  SET_CAMPAIGN,
  RESET_CAMPAIGN,
  MERGE_CAMPAIGN_ATTRIBUTE,
  DELETE_CAMPAIGN_ATTRIBUTE_ENTRY
} from '../actions/campaigns'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CAMPAIGN:
      return action.data
    case MERGE_CAMPAIGN_ATTRIBUTE:
      return mergeAttribute(state, action)
    case DELETE_CAMPAIGN_ATTRIBUTE_ENTRY: {
      let attr = state[action.attribute]

      attr = _.filter(attr, (a) => {
        return a.id !== action.id
      })

      if (action.sortBy) {
        attr = _.sortBy(attr, [action.sortBy]).reverse()
      }

      return { ...state, [action.attribute]: attr }
    }
    case RESET_CAMPAIGN:
      return initialState
  }

  return state
}
