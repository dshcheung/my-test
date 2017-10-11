import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsProfileIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

export const C_MY_STARTUP_PROFILE = "C_MY_STARTUP_PROFILE"
export const cMyStartupProfile = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsProfileIndex(params)),
    data: getFormData({
      overview: _.get(values, 'overview', null)
    }, 'profile')
  })

  return {
    type: C_MY_STARTUP_PROFILE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'profile'))
      notySuccess(`${_.get(values, 'overview') ? "Overview" : "Profile"} Created!`)
    }
  }
}

export const U_MY_STARTUP_PROFILE = "U_MY_STARTUP_PROFILE"
export const uMyStartupProfile = (values, params, cb, keyword = "Overview") => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsProfileIndex(params)),
    data: getFormData({
      overview: _.get(values, 'overview', null)
    }, 'profile')
  })

  return {
    type: U_MY_STARTUP_PROFILE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'profile'))
      notySuccess(`${keyword} Updated!`)
    }
  }
}
