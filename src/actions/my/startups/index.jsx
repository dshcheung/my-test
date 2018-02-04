import { genApiUrl, addParamsToUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsIndex, apiMyStartupsShow, apiMyStartupsAutoIndex } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { setStartup } from '../../startups'

export const MERGE_MY_STARTUPS = "MERGE_MY_STARTUPS"
export const mergeMyStartups = (data, reset) => {
  return {
    type: MERGE_MY_STARTUPS,
    data: data.startups,
    reset
  }
}

export const RESET_MY_STARTUPS = "RESET_MY_STARTUPS"
export const resetMyStartups = () => {
  return {
    type: RESET_MY_STARTUPS
  }
}

export const GET_MY_STARTUPS = "GET_MY_STARTUPS"
export const getMyStartups = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiMyStartupsIndex(), queries)
  })

  return {
    type: GET_MY_STARTUPS,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeMyStartups(data, !nextHref))
    }
  }
}

export const C_MY_STARTUP = "C_MY_STARTUP"
export const cMyStartup = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsIndex()),
    data: getFormData({
      name: _.get(values, 'name', null)
    }, 'startup')
  })

  return {
    type: C_MY_STARTUP,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyStartups({ startups: [data.startup] }))
    }
  }
}

export const U_MY_STARTUP = "U_MY_STARTUP"
export const uMyStartup = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsShow(params)),
    data: getFormData({
      name: _.get(values, 'name', null)
    }, 'startup')
  })

  return {
    type: U_MY_STARTUP,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(setStartup(data))
      notySuccess("Name Updated!")
    }
  }
}

export const SET_MY_STARTUPS_AUTO = "SET_MY_STARTUPS_AUTO"
export const setMyStartupsAuto = (data) => {
  return {
    type: SET_MY_STARTUPS_AUTO,
    data: data.startups
  }
}

export const RESET_MY_STARTUPS_AUTO = "RESET_MY_STARTUPS_AUTO"
export const resetMyStartupsAuto = () => {
  return {
    type: RESET_MY_STARTUPS_AUTO
  }
}

export const G_MY_STARTUPS_AUTO = "GET_MY_STARTUPS_AUTO"
export const gMyStartupsAuto = ({ queries = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyStartupsAutoIndex(), queries)
  })

  return {
    type: G_MY_STARTUPS_AUTO,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyStartupsAuto(data))
    }
  }
}
