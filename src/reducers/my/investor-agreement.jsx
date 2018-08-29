import {
  SET_MY_INVESTOR_AGREEMENT,
  RESET_MY_INVESTOR_AGREEMENT
} from '../../actions/my/investor-agreements'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_INVESTOR_AGREEMENT:
      return action.data
    case RESET_MY_INVESTOR_AGREEMENT:
      return initialState
  }
  return state
}
