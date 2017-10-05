import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsHighlightsIndex, apiMyStartupsHighlightsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute, deleteStartupAttributeEntry } from '../../startups'

// create
export const CREATE_MY_STARTUP_HIGHLIGHT = "CREATE_MY_STARTUP_HIGHLIGHT"
export const createMyStartupHighlight = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsHighlightsIndex(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "highlight")
  })

  return {
    type: CREATE_MY_STARTUP_HIGHLIGHT,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'highlights'))
      notySuccess("Highlight Added!")
    }
  }
}

// update
export const UPDATE_MY_STARTUP_HIGHLIGHT = "UPDATE_MY_STARTUP_HIGHLIGHT"
export const updateMyStartupHighlight = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsHighlightsShow(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "highlight")
  })

  return {
    type: UPDATE_MY_STARTUP_HIGHLIGHT,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'highlights'))
      notySuccess("Highlight Updated!")
    }
  }
}

// delete
export const DELETE_MY_STARTUP_HIGHLIGHT = "DELETE_MY_STARTUP_HIGHLIGHT"
export const deleteMyStartupHighlight = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsHighlightsShow(params))
  })

  return {
    type: `${DELETE_MY_STARTUP_HIGHLIGHT}_${params.highlightID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteStartupAttributeEntry(params.highlightID, 'highlights'))
    }
  }
}
