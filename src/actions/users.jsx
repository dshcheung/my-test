import { push } from 'react-router-redux'

import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiUsersIndex, apiUsersShow } from '../services/api-path'

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
export const createUser = (values) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiUsersIndex()),
    data: getFormData({
      role: _.get(values, 'role', null),
      email: _.get(values, 'email', null),
      password: _.get(values, 'password', null),
      profile: {
        first_name: _.get(values, 'firstName', null),
        last_name: _.get(values, 'lastName', null)
      }
    }, 'user')
  })

  return {
    type: CREATE_USER,
    request,
    successCB: (dispatch, data) => {
      dispatch(setCurrentUser(data))
      if (data.role === "Investor") {
        dispatch(push('/verify/investor_status'))
      }
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
