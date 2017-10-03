import { genApiUrl, addParamsToUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsIndex } from '../../../services/api-path'

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

export const CREATE_MY_STARTUP = "CREATE_MY_STARTUP"
export const createMyStartup = (values, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsIndex()),
    data: getFormData({
      name: _.get(values, 'name', null)
    }, 'startup')
  })

  return {
    type: CREATE_MY_STARTUP,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyStartups({ startups: [data.startup] }))
    }
  }
}
