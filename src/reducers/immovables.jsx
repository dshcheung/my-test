import {
  SET_IMMOVABLE,
  RESET_IMMOVABLE
} from '../actions/immovables'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IMMOVABLE: {
      let immovable = _.get(action, `immovable.${action.immovableID}`, null)
      if (!immovable) {
        immovable = { [action.immovableID]: _.get(action, 'immovable', []) }
      }

      return {
        ...state,
        ...immovable
      }
    }
    case RESET_IMMOVABLE:
      return initialState
  }
  return state
}
