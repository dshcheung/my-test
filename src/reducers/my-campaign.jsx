import { mergeAttribute, deleteAttribute } from '../services/utils'

import {
  SET_MY_CAMPAIGN,
  SET_MY_CAMPAIGN_FROM_STARTUP,
  RESET_MY_CAMPAIGN,
  MERGE_MY_CAMPAIGN_ATTRIBUTE,
  DELETE_MY_CAMPAIGN_ATTRIBUTE_ENTRY
} from '../actions/my/campaigns'

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_CAMPAIGN:
      return action.data
    case SET_MY_CAMPAIGN_FROM_STARTUP:
      return {
        ...action.data.campaign,
        startup: action.data.startup
      }
    case MERGE_MY_CAMPAIGN_ATTRIBUTE: {
      return mergeAttribute(state, action)
    }
    case DELETE_MY_CAMPAIGN_ATTRIBUTE_ENTRY: {
      return deleteAttribute(state, action)
    }
    case RESET_MY_CAMPAIGN:
      return initialState
  }
  return state
}
