import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyEndorsementsIndex, apiMyEndorsementsShow } from '../../services/api-path'
import { notySuccess } from '../../services/noty'

import { mergeCurrentUserAttribute } from '../session'

// create
export const CREATE_MY_ENDORSEMENT = "CREATE_MY_ENDORSEMENT"
export const createMyEndorsement = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyEndorsementsIndex()),
    data: getFormData({
      name: _.get(values, 'name', null),
      description: _.get(values, 'description', null)
    }, "endorsement")
  })

  return {
    type: CREATE_MY_ENDORSEMENT,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeCurrentUserAttribute(data, 'endorsements'))
      notySuccess("Endorsement Added!")
    }
  }
}

export const UPDATE_MY_ENDORSEMENT = "UPDATE_MY_ENDORSEMENT"
export const updateMyEndorsement = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyEndorsementsShow(params)),
    data: getFormData({
      name: _.get(values, 'name', null),
      description: _.get(values, 'description', null)
    }, "endorsement")
  })

  return {
    type: UPDATE_MY_ENDORSEMENT,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeCurrentUserAttribute(data, 'endorsements'))
      notySuccess("Endorsement Updated!")
    }
  }
}
