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
      description: _.get(values, 'description', null),
      overview: _.get(values, 'overview', null),
      tagline: _.get(values, 'tagline', null),
      year_founded: _.get(values, 'yearFounded', null),
      banner: _.get(values, 'banner[0]', null),
      avatar: _.get(values, 'avatar[0]', null)
    }, 'profile')
  })

  return {
    type: C_MY_STARTUP_PROFILE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'profile'))
      notySuccess("Created")
    }
  }
}

export const U_MY_STARTUP_PROFILE = "U_MY_STARTUP_PROFILE"
export const uMyStartupProfile = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsProfileIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      overview: _.get(values, 'overview', null),
      tagline: _.get(values, 'tagline', null),
      year_founded: _.get(values, 'yearFounded', null),
      banner: _.get(values, 'banner[0]', null),
      avatar: _.get(values, 'avatar[0]', null)
    }, 'profile')
  })

  return {
    type: U_MY_STARTUP_PROFILE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'profile'))
      notySuccess("Updated")
    }
  }
}
