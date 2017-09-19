import { push } from 'react-router-redux'

import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import {
  apiMyProfile, apiVerifyMyProfile,
  apiRequestVerification, apiRequestResendPassword
} from '../../services/api-path'
import { notySuccess } from '../../services/noty'

import { setCurrentUser, resetAllState } from '../session'

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
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
    }
  }
}

// update
export const UPDATE_MY_PROFILE = "UPDATE_MY_PROFILE"
export const updateMyProfile = () => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyProfile()),
    data: getFormData({}, 'user')
  })

  return {
    type: UPDATE_MY_PROFILE,
    request,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      notySuccess("Profile Updated!")
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
      dispatch(push('/'))
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
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      notySuccess("Reset Password Successful!")
      dispatch(push('/'))
    }
  }
}