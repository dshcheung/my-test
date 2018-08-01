import { push } from 'react-router-redux'

import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiUsersIndex, apiUsersShow } from '../services/api-path'
import { handleFormErrors } from '../services/noty'

import { setCurrentUser } from './session'

export const SET_USER = "SET_USER"
export const setUser = (data) => {
  return {
    type: SET_USER,
    user: data
  }
}

export const RESET_USER = "RESET_USER"
export const resetUser = () => {
  return {
    type: RESET_USER
  }
}

// create
export const CREATE_USER = "CREATE_USER"
export const createUser = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiUsersIndex()),
    data: getFormData({
      role: _.get(values, 'role', null),
      email: _.get(values, 'email', null),
      mobile: _.get(values, 'mobile', null),
      password: _.get(values, 'password', null),
      profile: {
        first_name: _.get(values, 'firstName', null),
        last_name: _.get(values, 'lastName', null),
        dob: _.get(values, 'dob', null),
        national_id: _.get(values, 'nationalID', null),
        address: _.get(values, 'address', null)
      },
      questionnaire: _.get(values, 'questionnaire', null)
    }, 'user')
  })

  return {
    type: CREATE_USER,
    request,
    hasRedirection: true,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(setCurrentUser(data))

      if (data.role === "StartupUser") {
        dispatch(push('/my/campaigns/new'))
      }
    },
    errorCB: (dispatch, data) => {
      handleFormErrors(data)
    }
  }
}

// show
export const GET_USER = "GET_USER"
export const getUser = ({ params = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiUsersShow(params))
  })

  return {
    type: GET_USER,
    request,
    successCB: (dispatch, data) => {
      dispatch(setUser(data))
    }
  }
}
