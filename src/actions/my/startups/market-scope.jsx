import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsMarketScopeIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

// create update
export const CU_MY_STARTUP_MARKET_SCOPE = "CU_MY_STARTUP_MARKET_SCOPE"
export const cuMyStartupMarketScope = (values, params, cb, isUpdate, keyword) => {
  const attachments = _.get(values, 'attachments', null)
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsMarketScopeIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: attachments
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

// delete
export const D_MY_STARTUP_MARKET_SCOPE_ATTACHMENT = "D_MY_STARTUP_MARKET_SCOPE_ATTACHMENT"
export const dMyStartupMarketScopeAttachment = (values, params) => {
  const attachments = _.get(values, 'attachments', null)
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsMarketScopeIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: attachments
    }, "market_scope")
  })
  const attachmentID = _.get(attachments, '[0].id', null)

  return {
    type: `${D_MY_STARTUP_MARKET_SCOPE_ATTACHMENT}_${attachmentID}`,
    request,
    successCB: (dispatch, data) => {
      dispatch(mergeStartupAttribute(data, 'market_scope'))
      notySuccess('Market Scope Attachment Deleted!')
    }
  }
}
