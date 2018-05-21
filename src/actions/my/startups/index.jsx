import { push, replace } from 'react-router-redux'

import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsIndex, apiMyStartupsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { setMyCampaignFromStartup } from '../campaigns'

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
    successCB: (dispatch, { startup }) => {
      dispatch(setMyCampaignFromStartup({ startup: _.omit(startup, 'campaign'), campaign: startup.campaign }))
      dispatch(push(`/my/campaigns/${startup.campaign.id}/edit/stage_questionnaire`))
      notySuccess("Submitted")
    }
  }
}

export const U_MY_STARTUP = "U_MY_STARTUP"
export const uMyStartup = (values, params) => {
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
    successCB: (dispatch, { startup }) => {
      dispatch(setMyCampaignFromStartup({ startup: _.omit(startup, 'campaign'), campaign: startup.campaign }))
      dispatch(replace(`/my/campaigns/${startup.campaign.id}/edit/stage_questionnaire`))
      notySuccess("Submitted")
    }
  }
}
