import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyVerificationsIndex, apiMyVerificationsResend } from '../../services/api-path'

import { notySuccess } from '../../services/noty'

export const U_MY_VERIFICATIONS = "U_MY_VERIFICATIONS"
export const uMyVerifications = (values, cb, routeParams) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyVerificationsIndex(routeParams)),
    data: getFormData({
      type: _.get(values, 'type', null),
      photo: _.get(values, 'photo[0]', null),
      code: _.get(values, 'code', null)
    }, 'user')
  })

  return {
    type: U_MY_VERIFICATIONS,
    request,
    successCB: (dispatch, data) => {
      // TODO: have gram return user object
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}

export const RESEND_VERIFICATION = "RESEND_VERIFICATION"
export const resendVerification = (values) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyVerificationsResend()),
    data: getFormData({
      resend_type: _.get(values, 'resend_type', null),
      resend_for: _.get(values, 'resend_for', null)
    }, 'user')
  })

  return {
    type: RESEND_VERIFICATION,
    request,
    successCB: () => {
      notySuccess("Verification Sent!")
    }
  }
}
