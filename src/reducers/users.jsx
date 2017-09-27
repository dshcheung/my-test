import {
  SET_USER,
  RESET_USER
} from '../actions/users'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case RESET_USER:
      return initialState
  }
  return state
}
