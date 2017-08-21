import { MERGE_REQUEST_IN_PROCESS } from '../actions/request-status'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_REQUEST_IN_PROCESS:
      return mergeRequestInProcess(state, action)
  }
  return state
}

function mergeRequestInProcess(state, { inProcess, requestName }) {
  const newObject = {}
  newObject[requestName] = inProcess
  return Object.assign({}, state, newObject)
}
