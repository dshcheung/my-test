import { genApiUrl, genAxios } from '../services/api-request'
import { apiImmovablesShow } from '../services/api-path'

export const SET_IMMOVABLE = "SET_IMMOVABLE"
export const setImmovable = (data, immovableID) => {
  return {
    type: SET_IMMOVABLE,
    immovable: data,
    immovableID
  }
}

export const RESET_IMMOVABLE = "RESET_IMMOVABLE"
export const resetImmovable = () => {
  return {
    type: RESET_IMMOVABLE
  }
}

export const G_IMMOVABLE = "G_IMMOVABLE"
export const G_IMMOVABLE_EDUCATION_LEVEL = "G_IMMOVABLE_EDUCATION_LEVEL"
export const G_IMMOVABLE_CAMPAIGN_FILTERABLE = "G_IMMOVABLE_CAMPAIGN_FILTERABLE"
export const G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE = "G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE"
export const G_IMMOVABLE_LEGAL_AGREEMENT = "G_IMMOVABLE_LEGAL_AGREEMENT"
export const G_IMMOVABLE_CAMPAIGN_TYPE_OPTIONS = "G_IMMOVABLE_CAMPAIGN_TYPE_OPTIONS"
export const G_IMMOVABLE_ATTACHMENT_OPTIONS = "G_IMMOVABLE_ATTACHMENT_OPTIONS"
export const G_IMMOVABLE_HASHTAG_OPTIONS = "G_IMMOVABLE_HASHTAG_OPTIONS"
export const G_IMMOVABLE_INVESTOR_RISK_ASSESSMENT = "G_IMMOVABLE_INVESTOR_RISK_ASSESSMENT"
export const G_IMMOVABLE_STARTUP_QUESTIONNAIRE_CAP_TABLE_OPTIONS = "G_IMMOVABLE_STARTUP_QUESTIONNAIRE_CAP_TABLE_OPTIONS"
export const G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS = "G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS"
export const G_IMMOVABLE_INVESTOR_TYPE_OF_PRODUCT_OPTIONS = "G_IMMOVABLE_INVESTOR_TYPE_OF_PRODUCT_OPTIONS"
export const G_IMMOVABLE_INVESTOR_SOURCE_OF_FUND_OPTIONS = "G_IMMOVABLE_INVESTOR_SOURCE_OF_FUND_OPTIONS"
export const gImmovable = ({ immovableID } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiImmovablesShow({ immovableID }))
  })

  return {
    type: `${G_IMMOVABLE}_${immovableID.toUpperCase()}`,
    request,
    successCB: (dispatch, data) => {
      dispatch(setImmovable(data, immovableID))
    }
  }
}
