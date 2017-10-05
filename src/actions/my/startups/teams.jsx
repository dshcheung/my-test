import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsTeamsIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

// create update
export const CU_MY_STARTUP_TEAM = "CU_MY_STARTUP_TEAM"
export const cuMyStartupTeam = (values, params, cb, isUpdate, keyword) => {
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsTeamsIndex(params)),
    data: getFormData({
      story: _.get(values, 'story', null),
      startup_founders_attributes: _.get(values, 'founders', null),
      startup_members_attributes: _.get(values, 'members', null)
    }, 'team')
  })

  return {
    type: CU_MY_STARTUP_TEAM,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'team'))
      notySuccess(`Team ${keyword} ${isUpdate ? 'Updated' : 'Created'}!`)
    }
  }
}
