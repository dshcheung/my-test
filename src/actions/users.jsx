import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiUsersIndex } from '../services/api-path'

import { setCurrentUser } from './session'

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
    }
  }
}
