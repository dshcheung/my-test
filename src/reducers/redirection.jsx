import {
  SET_REDIRECTION,
  RESET_REDIRECTION
} from '../actions/redirection'

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REDIRECTION:
      return true
    case RESET_REDIRECTION:
      return initialState
  }
  return state
}
