import {
  SET_MY_DASHBOARD,
  RESET_MY_DASHBOARD,
} from '../actions/my/dashboard'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_DASHBOARD:
      return action.data
    case RESET_MY_DASHBOARD:
      return initialState
  }
  return state
}
