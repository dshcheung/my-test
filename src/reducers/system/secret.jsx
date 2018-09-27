import { SET_SECRET } from '../../actions/system/secret'

const initialState = {
  hasSecret: false,
  startupOnly: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SECRET:
      return { ...action.secret }
  }
  return state
}
