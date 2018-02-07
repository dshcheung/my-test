import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsMilestonesIndex, apiMyStartupsMilestonesShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeMyCampaignAttribute, deleteMyCampaignAttributeEntry } from '../campaigns'

// create
export const C_MY_STARTUP_MILESTONE = "C_MY_STARTUP_MILESTONE"
export const cMyStartupMilestone = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsMilestonesIndex(params)),
    data: getFormData({
      completed_on: _.get(values, 'completedOn', null),
      detail: _.get(values, 'detail', null)
    }, "milestone")
  })

  return {
    type: C_MY_STARTUP_MILESTONE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.milestones'))
      notySuccess("Milestone Added!")
    }
  }
}

// update
export const U_MY_STARTUP_MILESTONE = "U_MY_STARTUP_MILESTONE"
export const uMyStartupMilestone = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsMilestonesShow(params)),
    data: getFormData({
      completed_on: _.get(values, 'completedOn', null),
      detail: _.get(values, 'detail', null)
    }, "milestone")
  })

  return {
    type: U_MY_STARTUP_MILESTONE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.milestones'))
      notySuccess("Milestone Updated!")
    }
  }
}

// delete
export const D_MY_STARTUP_MILESTONE = "D_MY_STARTUP_MILESTONE"
export const dMyStartupMilestone = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsMilestonesShow(params))
  })

  return {
    type: `${D_MY_STARTUP_MILESTONE}_${params.milestoneID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteMyCampaignAttributeEntry(params.milestoneID, 'startup.milestones'))
    }
  }
}
