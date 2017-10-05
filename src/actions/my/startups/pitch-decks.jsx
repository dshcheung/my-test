import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsPitchDecksIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create update
export const CU_MY_STARTUP_PITCH_DECK = "CU_MY_STARTUP_PITCH_DECK"
export const cuMyStartupPitchDeck = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsPitchDecksIndex(params)),
    data: getFormData({
      attachments_attributes: {
        title: _.get(values, 'title', null),
        file: _.get(values, 'file[0]', null)
      }
    }, "pitch_deck")
  })

  return {
    type: CU_MY_STARTUP_PITCH_DECK,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'pitch_decks'))
      notySuccess("Pitch Deck Updated!")
    }
  }
}

// delete
export const D_MY_STARTUP_PITCH_DECK = "D_MY_STARTUP_PITCH_DECK"
export const dMyStartupPitchDeck = (values, params) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsPitchDecksIndex(params)),
    data: getFormData(values)
  })

  return {
    type: `${D_MY_STARTUP_PITCH_DECK}_${params.pitchDeckID}`,
    request,
    successCB: () => {
      // dispatch(deleteCurrentUserAttributeEntry(params.pitchDeckID, 'pitch_decks'))
      notySuccess("Pitch Deck Deleted!")
    }
  }
}
