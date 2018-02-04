import {
  SET_MY_STARTUPS_AUTO,
  RESET_MY_STARTUPS_AUTO,
} from '../actions/my/startups'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_STARTUPS_AUTO:
      return action.data
    case RESET_MY_STARTUPS_AUTO:
      return initialState
  }
  return state
}
