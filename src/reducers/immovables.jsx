import {
  SET_IMMOVABLE,
  RESET_IMMOVABLE
} from '../actions/immovables'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IMMOVABLE:
      return {
        ...state,
        ...action.immovable
      }
    case RESET_IMMOVABLE:
      return initialState
  }
  return state
}
