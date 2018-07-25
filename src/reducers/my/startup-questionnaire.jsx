import {
  SET_MY_STARTUP_QUESTIONNAIRE,
  RESET_MY_STARTUP_QUESTIONNAIRE
} from '../../actions/my/startup-questionnaires'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_STARTUP_QUESTIONNAIRE:
      return action.data
    case RESET_MY_STARTUP_QUESTIONNAIRE:
      return initialState
  }
  return state
}
