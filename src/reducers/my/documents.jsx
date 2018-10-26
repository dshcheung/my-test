import {
  SET_MY_DOCUMENTS,
  RESET_MY_DOCUMENTS
} from '../../actions/my/documents'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_DOCUMENTS:
      return action.data
    case RESET_MY_DOCUMENTS:
      return initialState
  }
  return state
}
