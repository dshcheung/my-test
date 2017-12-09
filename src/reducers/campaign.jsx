import { getType, mergeData } from '../services/utils'

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
    case MERGE_CAMPAIGN_ATTRIBUTE: {
      let attr = state[action.attribute]
      const attrType = getType(attr)
      const dataType = getType(action.data)

      if (attrType === "Array") {
        attr = mergeData(attr, [action.data])
      }

      if (attrType === "Object") {
        attr = action.data
      }

      if (attrType === "Null" && dataType === "Object") {
        attr = action.data
      }

      if (action.sortBy) {
        attr = _.sortBy(attr, [action.sortBy]).reverse()
      }

      return { ...state, [action.attribute]: attr }
    }
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
