import Cookies from 'js-cookie'

import { AUTH_TOKEN } from '../constants'

import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiAuthenticatesIndex } from '../services/api-path'

export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const RESET_ALL_STATE = "RESET_ALL_STATE"

export const setCurrentUser = (data) => {
  Cookies.set(AUTH_TOKEN, data.authentication_token)

  return {
    type: SET_CURRENT_USER,
    user: data
  }
}

export const resetAllState = () => {
  Cookies.remove(AUTH_TOKEN)
  return {
    type: RESET_ALL_STATE
  }
}

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
