import { push } from 'react-router-redux'

import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import {
  apiMyProfile, apiVerifyMyProfile,
  apiRequestVerification, apiRequestResendPassword
} from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { setCurrentUser, resetAllState } from '../../session'

// show
export const GET_MY_PROFILE = "GET_MY_PROFILE"
export const getMyProfile = () => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyProfile())
  })

  return {
    type: GET_MY_PROFILE,
    request,
    run401: true,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
    }
  }
}

// update
export const UPDATE_MY_PROFILE = "UPDATE_MY_PROFILE"
export const updateMyProfile = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyProfile()),
    data: getFormData({
      email: _.get(values, 'email', null),
      mobile: _.get(values, 'mobile', null),
      profile: {
        first_name: _.get(values, 'firstName', null),
        last_name: _.get(values, 'lastName', null),
        bio: _.get(values, 'bio', null),
        avatar: _.get(values, 'avatar[0]', null),
        banner: _.get(values, 'banner[0]', null)
      }
    }, 'user')
  })

  return {
    type: UPDATE_MY_PROFILE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(setCurrentUser(data))
      notySuccess("Profile Updated!")
    }
  }
}

// update password
export const UPDATE_PASSWORD = "UPDATE_MY_PROFILE"
export const updatePassword = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyProfile()),
    data: getFormData({
      password: _.get(values, 'password', null),
      password_confirmation: _.get(values, 'passwordConfirmation', null)
    }, 'user')
  })

  return {
    type: UPDATE_PASSWORD,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(setCurrentUser(data))
      notySuccess("Password Updated!")
    }
  }
}

// destroy
export const DELETE_MY_PROFILE = "DELETE_MY_PROFILE"
export const deleteMyProfile = () => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyProfile())
  })

  return {
    type: DELETE_MY_PROFILE,
    request,
    successCB: (dispatch) => {
      dispatch(resetAllState(dispatch))
      notySuccess("Profile Deleted!")
    }
  }
}

// verify
export const VERIFY_MY_PROFILE = "VERIFY_MY_PROFILE"
export const verifyMyProfile = (values) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiVerifyMyProfile()),
    data: getFormData({
      email: _.get(values, 'email', null),
      code: _.get(values, 'code', null),
      mobile: _.get(values, 'mobile', null)
    }, 'user')
  })

  return {
    type: VERIFY_MY_PROFILE,
    request,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      notySuccess("Verified Successful!")
      if (data.role === "Investor") {
        dispatch(push("/my/portfolio"))
      } else if (data.role === "StartupUser") {
        dispatch(push("/my/dashboard"))
      }
    }
  }
}

// resend verification
export const REQUEST_VERIFICATION = "REQUEST_VERIFICATION"
export const requestVerification = (resendType = null) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiRequestVerification()),
    data: getFormData({
      resend_type: resendType
    }, 'user')
  })

  return {
    type: REQUEST_VERIFICATION,
    request,
    successCB: () => {
      notySuccess("Request Sent!")
    }
  }
}

// reset password
export const RESET_PASSWORD = "RESET_PASSWORD"
export const resetPassword = (values) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiRequestResendPassword()),
    data: getFormData({
      reset_token: _.get(values, 'resetToken', null),
      password: _.get(values, 'password', null)
    }, 'user')
  })

  return {
    type: RESET_PASSWORD,
    request,
    hasRedirection: true,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      if (data.role === "Investor") {
        dispatch(push("/my/portfolio"))
      } else if (data.role === "StartupUser") {
        dispatch(push("/my/dashboard"))
      }
    }
  }
}
