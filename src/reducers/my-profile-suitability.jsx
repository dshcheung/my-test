import {
  SET_MY_PROFILE_SUITABILITY, RESET_MY_PROFILE_SUITABILITY
} from '../actions/my/investor-profile-suitability'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_PROFILE_SUITABILITY:
      return action.data
    case RESET_MY_PROFILE_SUITABILITY:
      return initialState
  }
  return state
}
