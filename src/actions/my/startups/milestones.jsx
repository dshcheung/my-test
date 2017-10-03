import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsMilestonesIndex, apiMyStartupsMilestonesShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create
export const CREATE_MY_STARTUP_MILESTONE = "CREATE_MY_STARTUP_MILESTONE"
export const createMyStartupMilestone = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsMilestonesIndex(params)),
    data: getFormData({
      completed_on: _.get(values, 'completedOn', null),
      detail: _.get(values, 'detail', null)
    }, "milestone")
  })

  return {
    type: CREATE_MY_STARTUP_MILESTONE,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'milestones'))
      notySuccess("Milestone Added!")
    }
  }
}

// update
export const UPDATE_MY_STARTUP_MILESTONE = "UPDATE_MY_STARTUP_MILESTONE"
export const updateMyStartupMilestone = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsMilestonesShow(params)),
    data: getFormData({
      completed_on: _.get(values, 'completedOn', null),
      detail: _.get(values, 'detail', null)
    }, "milestone")
  })

  return {
    type: UPDATE_MY_STARTUP_MILESTONE,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'milestones'))
      notySuccess("Milestone Updated!")
    }
  }
}

// delete
export const DELETE_MY_STARTUP_MILESTONE = "DELETE_MY_STARTUP_MILESTONE"
export const deleteMyStartupMilestone = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsMilestonesShow(params))
  })

  return {
    type: `${DELETE_MY_STARTUP_MILESTONE}_${params.milestoneID}`,
    request,
    successCB: () => {
      // dispatch(deleteCurrentUserAttributeEntry(params.milestoneID, 'milestones'))
    }
  }
}
