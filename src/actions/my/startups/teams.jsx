import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsTeamsIndex } from '../../../services/api-path'

export const CREATE_OR_UPDATE_MY_STARTUP_TEAM = "CREATE_OR_UPDATE_MY_STARTUP_TEAM"
export const createOrUpdateMyStartupTeam = (values, params, cb) => {
  const request = genAxios({
    method: params.teamID ? "put" : "post",
    url: genApiUrl(apiMyStartupsTeamsIndex(params)),
    data: getFormData({
      story: _.get(values, 'story', null),
      startup_founders_attributes: _.get(values, 'founders', null),
      startup_members_attributes: _.get(values, 'members', null)
    }, 'team')
  })

  return {
    type: CREATE_OR_UPDATE_MY_STARTUP_TEAM,
    request,
    successCB: () => {
      if (cb) cb()
    }
  }
}
