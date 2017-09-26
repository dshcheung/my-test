import { getType, mergeData } from '../services/utils'

import {
  SET_USER,
  MERGE_USER_ATTRIBUTE,
  RESET_USER
} from '../actions/users'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case MERGE_USER_ATTRIBUTE: {
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
    case RESET_USER:
      return initialState
  }
  return state
}
