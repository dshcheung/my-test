import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyEducationsIndex, apiMyEducationsShow } from '../../services/api-path'
import { notySuccess } from '../../services/noty'

import { mergeCurrentUserAttribute, deleteCurrentUserAttributeEntry } from '../session'

// create
export const CREATE_MY_EDUCATION = "CREATE_MY_EDUCATION"
export const createMyEducation = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyEducationsIndex()),
    data: getFormData({
      school: _.get(values, 'school', null),
      year: _.get(values, 'year', null),
      education_level_id: _.get(values, 'educationLevel', null)
    }, "education")
  })

  return {
    type: CREATE_MY_EDUCATION,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeCurrentUserAttribute(data, 'educations'))
      notySuccess("Education Added!")
    }
  }
}

// update
export const UPDATE_MY_EDUCATION = "UPDATE_MY_EDUCATION"
export const updateMyEducation = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyEducationsShow(params)),
    data: getFormData({
      school: _.get(values, 'school', null),
      year: _.get(values, 'year', null),
      education_level_id: _.get(values, 'educationLevel', null)
    }, "education")
  })

  return {
    type: UPDATE_MY_EDUCATION,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeCurrentUserAttribute(data, 'educations'))
      notySuccess("Education Updated!")
    }
  }
}

// delete
export const DELETE_MY_EDUCATION = "DELETE_MY_EDUCATION"
export const deleteMyEducation = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyEducationsShow(params))
  })

  return {
    type: `${DELETE_MY_EDUCATION}_${params.myEducationID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteCurrentUserAttributeEntry(params.myEducationID, 'educations'))
    }
  }
}
