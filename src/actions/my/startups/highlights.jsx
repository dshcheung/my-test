import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsHighlightsIndex, apiMyStartupsHighlightsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create
export const C_MY_STARTUP_HIGHLIGHT = "C_MY_STARTUP_HIGHLIGHT"
export const cMyStartupHighlight = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsHighlightsIndex(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "highlight")
  })

  return {
    type: C_MY_STARTUP_HIGHLIGHT,
    request,
    successCB: () => {
      if (cb) cb()
      // TODO: mergeMyCampaignAttribute(data, 'highlights')
      notySuccess("Highlight Added!")
    }
  }
}

// update
export const U_MY_STARTUP_HIGHLIGHT = "U_MY_STARTUP_HIGHLIGHT"
export const uMyStartupHighlight = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsHighlightsShow(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "highlight")
  })

  return {
    type: U_MY_STARTUP_HIGHLIGHT,
    request,
    successCB: () => {
      if (cb) cb()
      // TODO: mergeMyCampaignAttribute(data, 'highlights')
      notySuccess("Highlight Updated!")
    }
  }
}

// delete
export const D_MY_STARTUP_HIGHLIGHT = "D_MY_STARTUP_HIGHLIGHT"
export const dMyStartupHighlight = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsHighlightsShow(params))
  })

  return {
    type: `${D_MY_STARTUP_HIGHLIGHT}_${params.highlightID}`,
    request,
    successCB: () => {
      // TODO: dispatch(deleteMyCampaignAttributeEntry(params.highlightID, 'highlights'))
    }
  }
}
