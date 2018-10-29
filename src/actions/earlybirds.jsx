import { push } from 'react-router-redux'

import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiEarlybirdsIndex } from '../services/api-path'

export const C_EARLYBIRD = "C_EARLYBIRD"
export const cEarlybird = (values) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiEarlybirdsIndex()),
    data: getFormData({
      email: _.get(values, 'email', null),
      mobile: _.get(values, 'mobile', null),
      first_name: _.get(values, 'first_name', null),
      last_name: _.get(values, 'last_name', null),
      code: _.get(values, 'code', null)
    }, 'user')
  })

  return {
    type: C_EARLYBIRD,
    request,
    hasRedirection: true,
    successCB: (dispatch) => {
      dispatch(push("/earlybird"))
    }
  }
}
