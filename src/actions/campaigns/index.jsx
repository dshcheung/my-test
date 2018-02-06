import { genApiUrl, addParamsToUrl, genAxios } from '../../services/api-request'
import { apiCampaignsIndex, apiCampaignsShow, apiCampaignsShowData } from '../../services/api-path'

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
    data
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

export const REQUEST_DATA_ACCESS = "REQUEST_DATA_ACCESS"
export const requestDataAccess = (params) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiCampaignsShowData(params))
  })

  return {
    type: REQUEST_DATA_ACCESS,
    request,
    successCB: () => {
      // console.log(data)
    }
  }
}

// requestDataAccess({ campaignID: "Kwfefjb2EZjtDR9r"})
