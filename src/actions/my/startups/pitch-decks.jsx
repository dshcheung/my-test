import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsPitchDecksIndex, apiMyStartupsPitchDecksShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create
export const CREATE_MY_STARTUP_PITCH_DECK = "CREATE_MY_STARTUP_PITCH_DECK"
export const createMyStartupPitchDeck = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsPitchDecksIndex(params)),
    data: getFormData({
      attachments_attributes: {
        title: _.get(values, 'title', null),
        file: _.get(values, 'file[0]', null)
      }
    }, "pitch_deck")
  })

  return {
    type: CREATE_MY_STARTUP_PITCH_DECK,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'pitch_decks'))
      notySuccess("Pitch Deck Added!")
    }
  }
}

// update
export const UPDATE_MY_STARTUP_PITCH_DECK = "UPDATE_MY_STARTUP_PITCH_DECK"
export const updateMyStartupPitchDeck = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsPitchDecksShow(params)),
    data: getFormData({
      attachments_attributes: {
        title: _.get(values, 'title', null),
        file: _.get(values, 'file[0]', null)
      }
    }, "pitch_deck")
  })

  return {
    type: UPDATE_MY_STARTUP_PITCH_DECK,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'pitch_decks'))
      notySuccess("Pitch Deck Updated!")
    }
  }
}

// delete
export const DELETE_MY_STARTUP_PITCH_DECK = "DELETE_MY_STARTUP_PITCH_DECK"
export const deleteMyStartupPitchDeck = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsPitchDecksShow(params))
  })

  return {
    type: `${DELETE_MY_STARTUP_PITCH_DECK}_${params.pitchDeckID}`,
    request,
    successCB: () => {
      // dispatch(deleteCurrentUserAttributeEntry(params.pitchDeckID, 'pitch_decks'))
    }
  }
}
