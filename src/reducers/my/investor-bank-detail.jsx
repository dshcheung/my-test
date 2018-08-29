import {
  SET_MY_INVESTOR_BANK_DETAIL,
  RESET_MY_INVESTOR_BANK_DETAIL
} from '../../actions/my/investor-bank-details'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_INVESTOR_BANK_DETAIL:
      return action.data
    case RESET_MY_INVESTOR_BANK_DETAIL:
      return initialState
  }
  return state
}
