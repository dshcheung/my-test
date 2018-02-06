import { genApiUrl, addParamsToUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyCampaignsIndex, apiMyCampaignsShow, apiMyCampaignsShowMFR } from '../../services/api-path'
import { notySuccess } from '../../services/noty'

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

export const SET_MY_CAMPAIGN = "SET_MY_CAMPAIGN"
export const setMyCampaign = (data) => {
  return {
    type: SET_MY_CAMPAIGN,
    data
  }
}

export const SET_MY_CAMPAIGN_FROM_STARTUP = "SET_MY_CAMPAIGN_FROM_STARTUP"
export const setMyCampaignFromStartup = ({ startup, campaign }) => {
  return {
    type: SET_MY_CAMPAIGN_FROM_STARTUP,
    data: { startup, campaign }
  }
}

export const RESET_MY_CAMPAIGN = "RESET_MY_CAMPAIGN"
export const resetMyCampaign = () => {
  return {
    type: RESET_MY_CAMPAIGN
  }
}

export const MERGE_MY_CAMPAIGN_ATTRIBUTE = "MERGE_MY_CAMPAIGN_ATTRIBUTE"
export const mergeMyCampaignAttribute = (data, targetPath) => {
  return {
    type: MERGE_MY_CAMPAIGN_ATTRIBUTE,
    targetPath,
    data
  }
}

export const DELETE_MY_CAMPAIGN_ATTRIBUTE_ENTRY = "DELETE_MY_CAMPAIGN_ATTRIBUTE_ENTRY"
export const deleteMyCampaignAttributeEntry = (id, targetPath) => {
  return {
    type: DELETE_MY_CAMPAIGN_ATTRIBUTE_ENTRY,
    targetPath,
    id
  }
}

export const G_MY_CAMPAIGN = "G_MY_CAMPAIGN"
export const gMyCampaign = ({ params = {}, queries = {} }) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyCampaignsShow(params), queries)
  })

  return {
    type: G_MY_CAMPAIGN,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyCampaign(data))
    }
  }
}

export const C_MY_CAMPAIGN = "C_MY_CAMPAIGN"
export const cMyCampaign = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyCampaignsIndex()),
    data: getFormData({
      startup_id: _.get(values, 'startup.id', null),
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
      notySuccess("Created!")
    }
  }
}

export const U_MY_CAMPAIGN = "U_MY_CAMPAIGN"
export const uMyCampaign = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyCampaignsShow(params)),
    data: getFormData({
      goal: _.get(values, 'goal', null),
      start_date: _.get(values, 'startDate', null),
      end_date: _.get(values, 'endDate', null),
      campaign_type_attributes: {
        id: _.get(values, 'id', null),
        name: _.get(values, 'name', null),
        maturity_date: _.get(values, 'maturityDate', null),
        interest_rate: _.get(values, 'interestRate', null),
        amount: _.get(values, 'amount', null),
        amount_type: _.get(values, 'amountType', null)
      }
    }, 'campaign')
  })

  return {
    type: U_MY_CAMPAIGN,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(setMyCampaign(data))
      notySuccess("Updated!")
    }
  }
}

export const MARK_MY_CAMPAIGN_FOR_REVIEW = "MARK_MY_CAMPAIGN_FOR_REVIEW"
export const markMyCampaignForReview = (params) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyCampaignsShowMFR(params))
  })

  return {
    type: MARK_MY_CAMPAIGN_FOR_REVIEW,
    request,
    successCB: () => {
    }
  }
}
