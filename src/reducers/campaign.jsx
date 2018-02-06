import {
  SET_CAMPAIGN,
  RESET_CAMPAIGN
} from '../actions/campaigns'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CAMPAIGN:
      return action.data
    case RESET_CAMPAIGN:
      return initialState
  }

  return state
}
