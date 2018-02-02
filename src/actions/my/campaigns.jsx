import { genApiUrl, addParamsToUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyCampaignsIndex, apiMyCampaignsShow } from '../../services/api-path'
import { notySuccess } from '../../services/noty'

import { setCampaign } from '../campaigns'

export const MERGE_MY_CAMPAIGNS = "MERGE_MY_CAMPAIGNS"
export const mergeMyCampaigns = (data, reset) => {
  return {
    type: MERGE_MY_CAMPAIGNS,
    data: data.campaigns,
    reset
  }
}

export const RESET_MY_CAMPAIGNS = "RESET_MY_CAMPAIGNS"
export const resetMyCampaigns = () => {
  return {
    type: RESET_MY_CAMPAIGNS
  }
}

export const G_MY_CAMPAIGNS = "G_MY_CAMPAIGNS"
export const gMyCampaigns = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiMyCampaignsIndex(), queries)
  })

  return {
    type: G_MY_CAMPAIGNS,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeMyCampaigns(data, !nextHref))
    }
  }
}

export const C_MY_CAMPAIGN = "C_MY_CAMPAIGN"
export const cMyCampaign = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyCampaignsIndex()),
    data: getFormData({
      startup_id: _.get(values, 'startupID', "QjVUdicmUzhDXr41"),
      goal: _.get(values, 'goal', null),
      start_date: _.get(values, 'startDate', null),
      end_date: _.get(values, 'endDate', null),
      campaign_type_attributes: {
        name: _.get(values, 'name', null),
        maturity_date: _.get(values, 'maturityDate', null),
        interest_rate: _.get(values, 'interestRate', null),
        amount: _.get(values, 'amount', null),
        amount_type: _.get(values, 'amountType', null)
      }
    }, 'campaign')
  })

  return {
    type: C_MY_CAMPAIGN,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaigns({ campaigns: [data] }))
    }
  }
}

export const U_MY_CAMPAIGN = "U_MY_CAMPAIGN"
export const uMyCampaign = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyCampaignsShow(params)),
    data: getFormData({
      startup_id: _.get(values, 'startupID', "aWtoVAhmxMHaW3GH"),
      goal: _.get(values, 'goal', null),
      campaign_type_attributes: {
        name: _.get(values, 'name', "TEST123")
      }
    }, 'campaign')
  })

  return {
    type: U_MY_CAMPAIGN,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(setCampaign(data))
      notySuccess("Name Updated!")
    }
  }
}
