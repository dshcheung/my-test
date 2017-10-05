import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsProfileIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

// TODO CUD
export const CU_MY_STARTUP_PROFILE = "CU_MY_STARTUP_PROFILE"
export const cuMyStartupProfile = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsProfileIndex(params)),
    data: getFormData({
      overview: _.get(values, 'overview', null)
    }, 'profile')
  })

  return {
    type: CU_MY_STARTUP_PROFILE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'profile'))
      notySuccess(`${_.get(values, 'overview') ? "Overview" : "Profile"} Updated!`)
    }
  }
}
