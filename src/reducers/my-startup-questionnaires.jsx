import { mergeData } from '../services/utils'

import {
  MERGE_MY_STARTUP_QUESTIONNAIRES, RESET_MY_STARTUP_QUESTIONNAIRES
} from '../actions/my/startup-questionnaires'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_MY_STARTUP_QUESTIONNAIRES:
      return mergeData(state, action.data.startup_questionnaires)
    case RESET_MY_STARTUP_QUESTIONNAIRES:
      return initialState
  }
  return state
}
