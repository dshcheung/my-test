import { MERGE_PAGINATE } from '../actions/pagination'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case MERGE_PAGINATE:
      return mergePaginate(state, action)
  }

  return state
}

function mergePaginate(state, { link, requestName }) {
  const newObject = {}
  if (link) {
    newObject[requestName] = "https://" + link
  } else {
    newObject[requestName] = null
  }
  return Object.assign({}, state, newObject)
}
