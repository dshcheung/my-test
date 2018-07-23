import { mergeData } from '../services/utils'

import {
  MERGE_MY_CONVERSATIONS
} from '../actions/my/conversations'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_MY_CONVERSATIONS:
      return action.reset ? action.data : mergeData(state, action.data)
  }
  return state
}
