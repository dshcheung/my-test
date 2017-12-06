import { genApiUrl, addParamsToUrl, genAxios } from '../services/api-request'
import { apiCampaignsIndex, apiCampaignsShow } from '../services/api-path'

export const MERGE_CAMPAIGNS = "MERGE_CAMPAIGNS"
export const mergeCampaigns = (data, reset) => {
  return {
    type: MERGE_CAMPAIGNS,
    data: data.campaigns,
    reset
  }
}

export const RESET_CAMPAIGNS = "RESET_CAMPAIGNS"
export const resetCampaigns = () => {
  return {
    type: RESET_CAMPAIGNS
  }
}

export const SET_CAMPAIGN = "SET_CAMPAIGN"
export const setCampaign = (data) => {
  return {
    type: SET_CAMPAIGN,
    data: data.campaign
  }
}

export const MERGE_CAMPAIGN_ATTRIBUTE = "MERGE_CAMPAIGN_ATTRIBUTE"
export const mergeCampaignAttribute = (data, attribute, sortBy) => {
  return {
    type: MERGE_CAMPAIGN_ATTRIBUTE,
    attribute,
    data,
    sortBy
  }
}

export const DELETE_CAMPAIGN_ATTRIBUTE_ENTRY = "DELETE_CAMPAIGN_ATTRIBUTE_ENTRY"
export const deleteCampaignAttributeEntry = (id, attribute) => {
  return {
    type: DELETE_CAMPAIGN_ATTRIBUTE_ENTRY,
    attribute,
    id
  }
}

export const RESET_CAMPAIGN = "RESET_CAMPAIGN"
export const resetCampaign = () => {
  return {
    type: RESET_CAMPAIGN
  }
}

export const GET_CAMPAIGNS = "GET_CAMPAIGNS"
export const getCampaigns = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiCampaignsIndex(), queries)
  })

  return {
    type: GET_CAMPAIGNS,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeCampaigns(data, !nextHref))
    }
  }
}

export const GET_CAMPAIGN = "GET_CAMPAIGN"
export const getCampaign = ({ params = {}, queries = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiCampaignsShow(params), queries)
  })

  return {
    type: GET_CAMPAIGN,
    request,
    successCB: (dispatch, data) => {
      dispatch(setCampaign(data))
    }
  }
}
