import { genApiUrl, genAxios, addParamsToUrl } from '../../services/api-request'
import { apiMyDashboardIndex } from '../../services/api-path'

export const SET_MY_DASHBOARD = "SET_MY_DASHBOARD"
export const setMyDashboard = (data, reset) => {
  return {
    type: SET_MY_DASHBOARD,
    data,
    reset
  }
}

export const RESET_MY_DASHBOARD = "RESET_MY_DASHBOARD"
export const resetMyDashboard = () => {
  return {
    type: RESET_MY_DASHBOARD
  }
}

export const G_MY_DASHBOARD = "G_MY_DASHBOARD"
export const gMyDashboard = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiMyDashboardIndex(), queries)
  })

  return {
    type: G_MY_DASHBOARD,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(setMyDashboard(data, !nextHref))
    }
  }
}
