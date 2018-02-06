import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsPitchDeckIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create update
export const CU_MY_STARTUP_PITCH_DECK = "CU_MY_STARTUP_PITCH_DECK"
export const cuMyStartupPitchDeck = (values, params, cb, isUpdate, keyword) => {
  const attachments = _.get(values, 'attachments', null)
  const request = genAxios({
    method: isUpdate ? "put" : "post",
    url: genApiUrl(apiMyStartupsPitchDeckIndex(params)),
    data: getFormData({
      description: _.get(values, 'description', null),
      attachments_attributes: attachments
    }, "pitch_deck")
  })

  return {
    type: CU_MY_STARTUP_PITCH_DECK,
    request,
    successCB: () => {
      if (cb) cb()
      // TODO: mergeCampaignAttribute(data, 'pitch_deck')
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
    successCB: () => {
      // TODO: mergeCampaignAttribute(data, 'pitch_deck')
      notySuccess('Pitch Deck Attachment Deleted!')
    }
  }
}
