import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsPitchDeckIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeMyCampaignAttribute } from '../campaigns'

// create update
export const CU_MY_STARTUP_PITCH_DECK = "CU_MY_STARTUP_PITCH_DECK"
export const cuMyStartupPitchDeck = (values, params, cb, isUpdate, keyword) => {
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsPitchDeckIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      original: _.get(values, 'file[0]', null)
    }, "pitch_deck")
  })

  return {
    type: CU_MY_STARTUP_PITCH_DECK,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.pitch_deck'))
      notySuccess(`Pitch Deck ${keyword} ${isUpdate ? 'Updated' : 'Created'}!`)
    }
  }
}

// delete
export const D_MY_STARTUP_PITCH_DECK_ATTACHMENT = "D_MY_STARTUP_PITCH_DECK_ATTACHMENT"
export const dMyStartupPitchDeckAttachment = (values, params) => {
  const attachments = _.get(values, 'attachments', null)
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsPitchDeckIndex(params)),
    data: getFormData({
      attachments_attributes: attachments
    }, "pitch_deck")
  })
  const attachmentID = _.get(attachments, '[0].id', null)

  return {
    type: `${D_MY_STARTUP_PITCH_DECK_ATTACHMENT}_${attachmentID}`,
    request,
    successCB: (dispatch, data) => {
      dispatch(mergeMyCampaignAttribute(data, 'startup.pitch_deck'))
      notySuccess('Pitch Deck Attachment Deleted!')
    }
  }
}
