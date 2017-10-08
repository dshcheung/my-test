import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsRiskIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

// create update
export const CU_MY_STARTUP_RISK = "CU_MY_STARTUP_RISK"
export const cuMyStartupRisk = (values, params, cb, isUpdate, keyword) => {
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsRiskIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: _.get(values, 'attachments', null)
    }, "risk")
  })

  return {
    type: CU_MY_STARTUP_RISK,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'risk'))
      notySuccess(`Risk ${keyword} ${isUpdate ? 'Updated' : 'Created'}!`)
    }
  }
}
