import { push } from 'react-router-redux'

import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyVerificationsIndex, apiMyVerificationsResend } from '../../services/api-path'

import { notySuccess } from '../../services/noty'

import { setCurrentUser } from '../session'

export const U_MY_VERIFICATIONS = "U_MY_VERIFICATIONS"
export const uMyVerifications = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyVerificationsIndex()),
    data: getFormData({
      photo: _.get(values, 'photo', null),
      code: _.get(values, 'code', null)
    }, 'user')
  })

  return {
    type: U_MY_VERIFICATIONS,
    request,
    hasRedirection: true,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      notySuccess("Successfully Verifed!")
      if (data.role === "Investor") {
        dispatch(push("/my/portfolio"))
      } else if (data.role === "StartupUser") {
        const lastLocation = window.localStorage.getItem("lastLocation")
        if (lastLocation) {
          dispatch(push(lastLocation))
          window.localStorage.setItem("lastLocation", "")
        } else {
          dispatch(push("/my/campaigns"))
        }
      }
      if (cb) cb(data)
    }
  }
}

export const RESEND_VERIFICATION = "RESEND_VERIFICATION"
export const resendVerification = (values, cb) => {
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
      if (cb) cb()
    }
  }
}
