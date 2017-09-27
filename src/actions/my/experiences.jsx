import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyExperienceIndex, apiMyExperienceShow } from '../../services/api-path'
import { notySuccess } from '../../services/noty'

import { mergeCurrentUserAttribute, deleteCurrentUserAttributeWithID } from '../session'

// create
export const CREATE_MY_EXPERIENCE = "CREATE_MY_EXPERIENCE"
export const createMyExperience = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyExperienceIndex()),
    data: getFormData({
      company: _.get(values, 'company', null),
      year: _.get(values, 'year', null),
      position: _.get(values, 'position', null),
      description: _.get(values, 'description', null)
    }, "experience")
  })

  return {
    type: CREATE_MY_EXPERIENCE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeCurrentUserAttribute(data, 'experiences'))
      notySuccess("Experience Added!")
    }
  }
}

// update
export const UPDATE_MY_EXPERIENCE = "UPDATE_MY_EXPERIENCE"
export const updateMyExperience = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyExperienceShow(params)),
    data: getFormData({
      company: _.get(values, 'company', null),
      year: _.get(values, 'year', null),
      position: _.get(values, 'position', null),
      description: _.get(values, 'description', null)
    }, "experience")
  })

  return {
    type: UPDATE_MY_EXPERIENCE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeCurrentUserAttribute(data, 'experiences'))
      notySuccess("Experience Updated!")
    }
  }
}

// delete
export const DELETE_MY_EXPERIENCE = "DELETE_MY_EXPERIENCE"
export const deleteMyExperience = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyExperienceShow(params))
  })

  return {
    type: `${DELETE_MY_EXPERIENCE}_${params.myExperienceID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteCurrentUserAttributeWithID(params.myExperienceID, 'experiences'))
    }
  }
}
