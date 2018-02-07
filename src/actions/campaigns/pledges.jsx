import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiCampaignsPledgesIndex } from '../../services/api-path'

import { setCampaign } from './index'

export const C_PLEDGE = "C_PLEDGE"
export const cPledge = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiCampaignsPledgesIndex(params)),
    data: getFormData({
      amount: _.get(values, 'amount', null)
    }, 'campaign')
  })
  return {
    type: C_PLEDGE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(setCampaign(data))
    }
  }
}
