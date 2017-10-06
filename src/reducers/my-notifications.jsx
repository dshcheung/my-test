import { mergeData } from '../services/utils'

import {
  MERGE_MY_NOTIFICATIONS
} from '../actions/my/notifications'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_MY_NOTIFICATIONS:
      return action.reset ? action.data : mergeData(state, action.data)
  }
  return state
}
