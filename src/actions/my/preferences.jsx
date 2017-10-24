import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyPreferencesIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'

import { setCurrentUser } from '../session'

export const U_MY_PREFERENCES = "U_MY_PREFERENCES"
export const uMyPreferences = (values) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyPreferencesIndex()),
    data: getFormData({
      preferences: {
        notify: _.get(values, 'notify', null),
        locale: _.get(values, 'locale', null),
        show_email: _.get(values, 'showEmail', null),
        show_mobile: _.get(values, 'showMobile', null)
      }
    }, "user")
  })

  return {
    type: U_MY_PREFERENCES,
    request,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      notySuccess("Preferences Updated!")
    }
  }
}
