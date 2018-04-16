import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsProfileIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeMyCampaignAttribute } from '../campaigns'

export const CU_MY_STARTUP_PROFILE = "CU_MY_STARTUP_PROFILE"
export const cuMyStartupProfile = (values, params, cb, keyword) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsProfileIndex(params)),
    data: getFormData({
      updates: _.get(values, 'updates', null),
      highlights: _.get(values, 'highlights', null),
      overview: _.get(values, 'overview', null),
      market: _.get(values, 'market', null),
      strategy: _.get(values, 'strategy', null),
      use_of_funds: _.get(values, 'useOfFunds', null),
      avatar: _.get(values, 'avatar[0]', null),
      banner: _.get(values, 'banner[0]', null),
      description: _.get(values, 'description', null),
      tagline: _.get(values, 'tagline', null),
      year_founded: _.get(values, 'yearFounded', null)
    }, 'profile')
  })

  return {
    type: CU_MY_STARTUP_PROFILE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.profile'))
      notySuccess(`Updated ${keyword || ""}`)
    }
  }
}
