import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsProfile } from '../../../services/api-path'

export const UPDATE_MY_STARTUP_PROFILE = "UPDATE_MY_STARTUP_PROFILE"
export const updateMyStartupProfile = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsProfile(params)),
    data: getFormData({
      profile: {
        overview: _.get(values, 'overview', null)
      }
    }, 'startup')
  })

  return {
    type: UPDATE_MY_STARTUP_PROFILE,
    request,
    successCB: () => {
      if (cb) cb()
    }
  }
}
