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
// to remove
export const G_IMMOVABLE_STARTUP_FILTERABLE = "G_IMMOVABLE_STARTUP_FILTERABLE"
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
