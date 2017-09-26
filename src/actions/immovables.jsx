import { genApiUrl, genAxios } from '../services/api-request'
import { apiImmovablesIndex, apiImmovablesShow } from '../services/api-path'

export const SET_IMMOVABLES = "SET_IMMOVABLES"
export const setImmovables = (data) => {
  return {
    type: SET_IMMOVABLES,
    immovables: data
  }
}

export const SET_IMMOVABLE = "SET_IMMOVABLE"
export const setImmovable = (data) => {
  return {
    type: SET_IMMOVABLE,
    immovable: data
  }
}

export const RESET_IMMOVABLE = "RESET_IMMOVABLE"
export const resetImmovable = () => {
  return {
    type: RESET_IMMOVABLE
  }
}


export const GET_IMMOVABLES = "GET_IMMOVABLES"
export const getImmovables = () => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiImmovablesIndex())
  })

  return {
    type: GET_IMMOVABLES,
    request,
    successCB: (dispatch, data) => {
      dispatch(setImmovables(data))
    }
  }
}

export const GET_IMMOVABLE = "GET_IMMOVABLE"
export const GET_IMMOVABLE_EDUCATION_LEVEL = "GET_IMMOVABLE_EDUCATION_LEVEL"
export const getImmovable = (immovableID) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiImmovablesShow({ immovableID }))
  })

  return {
    type: `${GET_IMMOVABLE}_${immovableID.toUpperCase()}`,
    request,
    successCB: (dispatch, data) => {
      dispatch(setImmovable(data))
    }
  }
}
