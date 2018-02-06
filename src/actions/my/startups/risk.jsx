import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsRiskIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeMyCampaignAttribute } from '../campaigns'

// create update
export const CU_MY_STARTUP_RISK = "CU_MY_STARTUP_RISK"
export const cuMyStartupRisk = (values, params, cb, isUpdate, keyword) => {
  const attachments = _.get(values, 'attachments', null)
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsRiskIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: attachments
    }, "risk")
  })

  return {
    type: CU_MY_STARTUP_RISK,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.risk'))
      notySuccess(`Risk ${keyword} ${isUpdate ? 'Updated' : 'Created'}!`)
    }
  }
}

// delete
export const D_MY_STARTUP_RISK_ATTACHMENT = "D_MY_STARTUP_RISK_ATTACHMENT"
export const dMyStartupRiskAttachment = (values, params) => {
  const attachments = _.get(values, 'attachments', null)
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsRiskIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: attachments
    }, "risk")
  })
  const attachmentID = _.get(attachments, '[0].id', null)

  return {
    type: `${D_MY_STARTUP_RISK_ATTACHMENT}_${attachmentID}`,
    request,
    successCB: (dispatch, data) => {
      dispatch(mergeMyCampaignAttribute(data, 'startup.risk'))
      notySuccess('Risk Attachment Deleted!')
    }
  }
}
