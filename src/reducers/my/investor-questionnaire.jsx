import {
  SET_MY_INVESTOR_QUESTIONNAIRE,
  RESET_MY_INVESTOR_QUESTIONNAIRE
} from '../../actions/my/investor-questionnaires'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_INVESTOR_QUESTIONNAIRE:
      return action.data
    case RESET_MY_INVESTOR_QUESTIONNAIRE:
      return initialState
  }
  return state
}
