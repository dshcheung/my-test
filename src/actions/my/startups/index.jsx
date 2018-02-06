import { push } from 'react-router-redux'

import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsIndex, apiMyStartupsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

export const C_MY_STARTUP = "C_MY_STARTUP"
export const cMyStartup = (values) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsIndex()),
    data: getFormData({
      name: _.get(values, 'name', null)
    }, 'startup')
  })

  return {
    type: C_MY_STARTUP,
    request,
    successCB: (dispatch, data) => {
      // TODO: setMyCampaign(data)
      dispatch(push(`/my/campaigns/${data.startup.campaign.id}/edit`))
    }
  }
}

export const U_MY_STARTUP = "U_MY_STARTUP"
export const uMyStartup = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsShow(params)),
    data: getFormData({
      name: _.get(values, 'name', null)
    }, 'startup')
  })

  return {
    type: U_MY_STARTUP,
    request,
    successCB: () => {
      if (cb) cb()
      // TODO: setMyCampaign(data)
      notySuccess("Updated")
    }
  }
}
