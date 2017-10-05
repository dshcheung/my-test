import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsMarketScopesIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

// create update
export const CU_MY_STARTUP_MARKET_SCOPE = "CU_MY_STARTUP_MARKET_SCOPE"
export const cuMyStartupMarketScope = (values, params, cb, isUpdate, keyword) => {
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsMarketScopesIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: {
        title: _.get(values, 'title', null),
        file: _.get(values, 'file[0]', null)
      }
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
