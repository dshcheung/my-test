import { mergeData } from '../services/utils'

import {
  MERGE_MY_QUESTIONNAIRES,
  RESET_MY_QUESTIONNAIRES,
} from '../actions/my/questionnaires'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_MY_QUESTIONNAIRES:
      return action.reset ? action.data : mergeData(state, action.data)
    case RESET_MY_QUESTIONNAIRES:
      return initialState
  }
  return state
}
