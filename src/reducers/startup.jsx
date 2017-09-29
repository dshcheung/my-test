import {
  SET_STARTUP,
  RESET_STARTUP
} from '../actions/startups'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STARTUP:
      return action.data
    case RESET_STARTUP:
      return initialState
  }
  return state
}
