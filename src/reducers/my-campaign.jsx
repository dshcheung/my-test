import { mergeAttribute } from '../services/utils'

import {
  SET_MY_CAMPAIGN,
  RESET_MY_CAMPAIGN,
  MERGE_MY_CAMPAIGN_ATTRIBUTE,
  DELETE_MY_CAMPAIGN_ATTRIBUTE_ENTRY
} from '../actions/my/campaigns'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_CAMPAIGN:
      return action.data
    case MERGE_MY_CAMPAIGN_ATTRIBUTE:
      return mergeAttribute(state, action)
    case DELETE_MY_CAMPAIGN_ATTRIBUTE_ENTRY: {
      let attr = state[action.attribute]

      attr = _.filter(attr, (a) => {
        return a.id !== action.id
      })

      if (action.sortBy) {
        attr = _.sortBy(attr, [action.sortBy]).reverse()
      }

      return { ...state, [action.attribute]: attr }
    }
    case RESET_MY_CAMPAIGN:
      return initialState
  }
  return state
}
