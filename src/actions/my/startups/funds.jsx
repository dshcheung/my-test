import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsFundsIndex, apiMyStartupsFundsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute, deleteStartupAttributeEntry } from '../../startups'

// create
export const CREATE_MY_STARTUP_FUND = "CREATE_MY_STARTUP_FUND"
export const createMyStartupFund = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsFundsIndex(params)),
    data: getFormData({
      received_at: _.get(values, 'receivedAt', null),
      company: _.get(values, 'company', null),
      amount: _.get(values, 'amount', null)
    }, "startup_fund")
  })

  return {
    type: CREATE_MY_STARTUP_FUND,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'funds', 'received_at'))
      notySuccess("Fund Added!")
    }
  }
}

// update
export const UPDATE_MY_STARTUP_FUND = "UPDATE_MY_STARTUP_FUND"
export const updateMyStartupFund = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsFundsShow(params)),
    data: getFormData({
      received_at: _.get(values, 'receivedAt', null),
      company: _.get(values, 'company', null),
      amount: _.get(values, 'amount', null)
    }, "startup_fund")
  })

  return {
    type: UPDATE_MY_STARTUP_FUND,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'funds', 'received_at'))
      notySuccess("Fund Updated!")
    }
  }
}

// delete
export const DELETE_MY_STARTUP_FUND = "DELETE_MY_STARTUP_FUND"
export const deleteMyStartupFund = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsFundsShow(params))
  })

  return {
    type: `${DELETE_MY_STARTUP_FUND}_${params.fundID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteStartupAttributeEntry(params.fundID, 'funds', 'received_at'))
    }
  }
}
