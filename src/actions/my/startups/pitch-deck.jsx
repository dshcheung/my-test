import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsPitchDeckIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute } from '../../startups'

// create update
export const CU_MY_STARTUP_PITCH_DECK = "CU_MY_STARTUP_PITCH_DECK"
export const cuMyStartupPitchDeck = (values, params, cb, isUpdate, keyword) => {
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsPitchDeckIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: _.get(values, 'attachments', null)
    }, "pitch_deck")
  })

  return {
    type: CU_MY_STARTUP_PITCH_DECK,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'pitch_deck'))
      notySuccess(`Pitch Deck ${keyword} ${isUpdate ? 'Updated' : 'Created'}!`)
    }
  }
}
