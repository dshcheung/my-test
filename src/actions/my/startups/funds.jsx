import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsFundsIndex, apiMyStartupsFundsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeMyCampaignAttribute, deleteMyCampaignAttributeEntry } from '../campaigns'

// create
export const C_MY_STARTUP_FUND = "C_MY_STARTUP_FUND"
export const cMyStartupFund = (values, params, cb) => {
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
    type: C_MY_STARTUP_FUND,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.funds'))
      notySuccess("Use of Funds Added")
    }
  }
}

// update
export const U_MY_STARTUP_FUND = "U_MY_STARTUP_FUND"
export const uMyStartupFund = (values, params, cb) => {
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
    type: U_MY_STARTUP_FUND,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.funds'))
      notySuccess("Use of Funds Updated")
    }
  }
}

// delete
export const D_MY_STARTUP_FUND = "D_MY_STARTUP_FUND"
export const dMyStartupFund = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsFundsShow(params))
  })

  return {
    type: `${D_MY_STARTUP_FUND}_${params.fundID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteMyCampaignAttributeEntry(params.fundID, 'startup.funds'))
    }
  }
}
