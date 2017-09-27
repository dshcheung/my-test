import { getType, mergeData } from '../services/utils'

import {
  SET_CURRENT_USER,
  MERGE_CURRENT_USER_ATTRIBUTE,
  DELETE_CURRENT_USER_ATTRIBUTE_ENTRY
} from '../actions/session'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
    case MERGE_CURRENT_USER_ATTRIBUTE: {
      let attr = state[action.attribute]
      const attrType = getType(attr)

      if (attrType === "Array") {
        attr = mergeData(attr, [action.data])
      }

      if (attrType === "Object") {
        attr = action.data
      }

      return { ...state, [action.attribute]: attr }
    }
    case DELETE_CURRENT_USER_ATTRIBUTE_ENTRY: {
      let attr = state[action.attribute]

      attr = _.filter(attr, (a) => {
        return a.id !== action.id
      })

      return { ...state, [action.attribute]: attr }
    }
  }
  return state
}
