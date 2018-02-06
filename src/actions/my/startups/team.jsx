import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsTeamIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create update
export const CU_MY_STARTUP_TEAM = "CU_MY_STARTUP_TEAM"
export const cuMyStartupTeam = (values, params, cb, isUpdate, keyword) => {
  const founders = _.get(values, 'founders', null)
  const members = _.get(values, 'members', null)
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsTeamIndex(params)),
    data: getFormData({
      story: _.get(values, 'story', null),
      startup_founders_attributes: founders,
      startup_members_attributes: members
    }, 'team')
  })

  return {
    type: CU_MY_STARTUP_TEAM,
    request,
    successCB: () => {
      if (cb) cb()
      // TODO: mergeMyCampaignAttribute(data, 'team')
      notySuccess(`Team ${keyword} ${isUpdate ? 'Updated' : 'Created'}!`)
    }
  }
}

// delete
export const D_MY_STARTUP_TEAM_MEMBER = "D_MY_STARTUP_TEAM_MEMBER"
export const dMyStartupTeamMember = (values, params, keyword) => {
  const founders = _.get(values, 'founders', null)
  const members = _.get(values, 'members', null)
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsTeamIndex(params)),
    data: getFormData({
      startup_founders_attributes: founders,
      startup_members_attributes: members
    }, 'team')
  })
  const targetArr = founders || members
  const targetID = _.get(targetArr, '[0].id', null)

  return {
    type: `${D_MY_STARTUP_TEAM_MEMBER}_${targetID}`,
    request,
    successCB: () => {
      // TODO: mergeMyCampaignAttribute(data, 'team')
      notySuccess(`Team ${keyword} Deleted!`)
    }
  }
}
