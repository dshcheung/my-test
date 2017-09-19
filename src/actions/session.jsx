import Cookies from 'js-cookie'
import { push } from 'react-router-redux'

import { AUTH_TOKEN } from '../constants'

import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiAuthenticatesIndex, apiRequestForgetPassword } from '../services/api-path'
import { notySuccess } from '../services/noty'

export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const setCurrentUser = (data) => {
  Cookies.set(AUTH_TOKEN, data.authentication_token)

  return {
    type: SET_CURRENT_USER,
    user: data
  }
}

export const RESET_ALL_STATE = "RESET_ALL_STATE"
export const resetAllState = (dispatch) => {
  Cookies.remove(AUTH_TOKEN)
  dispatch(push("/"))

  return {
    type: RESET_ALL_STATE
  }
}

// create
export const CREATE_SESSION = "CREATE_SESSION"
export const createSession = (values) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiAuthenticatesIndex()),
    data: getFormData({
      login: _.get(values, 'email', null),
      password: _.get(values, 'password', null)
    }, 'user')
  })

  return {
    type: CREATE_SESSION,
    request,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
    }
  }
}

// forget password
export const REQUEST_FORGET_PASSWORD = REQUEST_FORGET_PASSWORD
export const requestForgetPassword = (values) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiRequestForgetPassword()),
    data: getFormData({
      login: _.get(values, 'email', null)
    }, 'user')
  })

  return {
    type: REQUEST_FORGET_PASSWORD,
    request,
    successCB: (dispatch) => {
      notySuccess("Request Sent!")
      dispatch(push('/auth/reset_password'))
    }
  }
}
