import {
  SET_CURRENT_USER
} from '../actions/session'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
  }
  return state
}
