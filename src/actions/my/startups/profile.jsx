import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsProfileIndex, apiMyStartupsProfileShow } from '../../../services/api-path'

export const CREATE_MY_STARTUP_PROFILE = "CREATE_MY_STARTUP_PROFILE"
export const createMyStartupProfile = (values, params, cb) => {
  const request = genAxios({
    method: 'post',
    url: genApiUrl(apiMyStartupsProfileIndex(params)),
    data: getFormData({
      overview: _.get(values, 'overview', null)
    }, 'profile')
  })

  return {
    type: CREATE_MY_STARTUP_PROFILE,
    request,
    successCB: () => {
      if (cb) cb()
    }
  }
}

export const UPDATE_MY_STARTUP_PROFILE = "UPDATE_MY_STARTUP_PROFILE"
export const updateMyStartupProfile = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsProfileShow(params)),
    data: getFormData({
      overview: _.get(values, 'overview', null)
    }, 'profile')
  })

  return {
    type: UPDATE_MY_STARTUP_PROFILE,
    request,
    successCB: () => {
      if (cb) cb()
    }
  }
}
