import { genApiUrl, addParamsToUrl, genAxios } from '../services/api-request'
import { apiStartupsIndex, apiStartupsShow } from '../services/api-path'

export const MERGE_STARTUPS = "MERGE_STARTUPS"
export const RESET_STARTUPS = "RESET_STARTUPS"

export const SET_STARTUP = "SET_STARTUP"
export const RESET_STARTUP = "RESET_STARTUP"

export const mergeStartups = (data, reset) => {
  return {
    type: MERGE_STARTUPS,
    data: data.startups,
    reset
  }
}

export const resetStartups = () => {
  return {
    type: RESET_STARTUPS
  }
}

export const setStartup = (data) => {
  return {
    type: SET_STARTUP,
    data
  }
}

export const resetStartup = () => {
  return {
    type: RESET_STARTUP
  }
}

export const GET_STARTUPS = "GET_STARTUPS"
export const GET_STARTUP = "GET_STARTUP"

export const getStartups = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiStartupsIndex(), queries)
  })

  return {
    type: GET_STARTUPS,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeStartups(data, !!nextHref))
    }
  }
}

export const getStartup = ({ params = {}, queries = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiStartupsShow(params), queries)
  })

  return {
    type: GET_STARTUP,
    request,
    successCB: (dispatch, data) => {
      dispatch(setStartup(data))
    }
  }
}
