import {
  SET_IMMOVABLES,
  SET_IMMOVABLE,
  RESET_IMMOVABLE
} from '../actions/immovables'

const initialState = {
  index: [],
  show: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IMMOVABLES:
      return { ...state, index: action.immovables }
    case SET_IMMOVABLE:
      return {
        ...state,
        show: {
          ...state.show,
          ...action.immovable
        }
      }
    case RESET_IMMOVABLE:
      return {
        ...state,
        show: initialState.show
      }
  }
  return state
}
