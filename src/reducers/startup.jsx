import { getType, mergeData } from '../services/utils'

import {
  SET_STARTUP,
  RESET_STARTUP,
  MERGE_STARTUP_ATTRIBUTE,
  DELETE_STARTUP_ATTRIBUTE_ENTRY
} from '../actions/startups'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STARTUP:
      return action.data
    case MERGE_STARTUP_ATTRIBUTE: {
      let attr = state[action.attribute]
      const attrType = getType(attr)

      if (attrType === "Array") {
        attr = mergeData(attr, [action.data])
      }

      if (attrType === "Object") {
        attr = action.data
      }

      if (action.sortBy) {
        attr = _.sortBy(attr, [action.sortBy]).reverse()
      }

      return { ...state, [action.attribute]: attr }
    }
    case DELETE_STARTUP_ATTRIBUTE_ENTRY: {
      let attr = state[action.attribute]

      attr = _.filter(attr, (a) => {
        return a.id !== action.id
      })

      if (action.sortBy) {
        attr = _.sortBy(attr, [action.sortBy]).reverse()
      }

      return { ...state, [action.attribute]: attr }
    }
    case RESET_STARTUP:
      return initialState
  }
  return state
}
