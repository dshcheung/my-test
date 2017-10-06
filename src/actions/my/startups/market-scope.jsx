import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsMarketScopeIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

// create update
export const CU_MY_STARTUP_MARKET_SCOPE = "CU_MY_STARTUP_MARKET_SCOPE"
export const cuMyStartupMarketScope = (values, params, cb, isUpdate, keyword) => {
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsMarketScopeIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: _.get(values, 'attachments', null)
    }, "market_scope")
  })

  return {
    type: CU_MY_STARTUP_MARKET_SCOPE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'market_scope'))
      notySuccess(`Market Scope ${keyword} ${isUpdate ? 'Updated' : 'Created'}!`)
    }
  }
}
