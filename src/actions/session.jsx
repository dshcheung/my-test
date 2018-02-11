import Cookies from 'js-cookie'
import { push } from 'react-router-redux'

import { AUTH_TOKEN } from '../constants'

import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiAuthenticatesIndex, apiRequestForgetPassword } from '../services/api-path'
import { notySuccess, handleFormErrors } from '../services/noty'

export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const setCurrentUser = (data) => {
  Cookies.set(AUTH_TOKEN, data.authentication_token)

  return {
    type: SET_CURRENT_USER,
    user: data
  }
}

export const MERGE_CURRENT_USER_ATTRIBUTE = "MERGE_CURRENT_USER_ATTRIBUTE"
export const mergeCurrentUserAttribute = (data, attribute) => {
  return {
    type: MERGE_CURRENT_USER_ATTRIBUTE,
    attribute,
    data
  }
}

export const DELETE_CURRENT_USER_ATTRIBUTE_ENTRY = "DELETE_CURRENT_USER_ATTRIBUTE_ENTRY"
export const deleteCurrentUserAttributeEntry = (id, attribute) => {
  return {
    type: DELETE_CURRENT_USER_ATTRIBUTE_ENTRY,
    attribute,
    id
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
    hasRedirection: true,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      if (data.role === "Investor") {
        dispatch(push("/my/portfolio"))
      } else if (data.role === "StartupUser") {
        dispatch(push("/my/dashboard"))
      }
    },
    errorCB: (dispatch, data) => {
      handleFormErrors(data)
    }
  }
}

// destroy
export const DELETE_SEESION = "DELETE_SEESION"
export const deleteSession = () => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiAuthenticatesIndex())
  })

  return {
    type: DELETE_SEESION,
    request,
    successCB: (dispatch) => {
      dispatch(resetAllState(dispatch))
      notySuccess("Successfully Logged Out")
    },
    errorCB: (dispatch) => {
      dispatch(resetAllState(dispatch))
      notySuccess("Successfully Logged Out")
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
    hasRedirection: true,
    successCB: (dispatch) => {
      notySuccess("Request Sent!")
      dispatch(push('/auth/reset_password'))
    },
    errorCB: (dispatch, data) => {
      handleFormErrors(data)
    }
  }
}
