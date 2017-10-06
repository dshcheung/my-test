import { genApiUrl, addParamsToUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyNotificationsIndex, apiMyNotificationsShowRead } from '../../services/api-path'

export const MERGE_MY_NOFICATIONS = "MERGE_MY_NOFICATIONS"
export const mergeMyNotifications = (data, reset) => {
  return {
    type: MERGE_MY_NOFICATIONS,
    data: data.notifications,
    reset
  }
}

export const G_MY_NOTIFICATIONS = "G_MY_NOTIFICATIONS"
export const gMyNotifications = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiMyNotificationsIndex(), queries)
  })

  return {
    type: G_MY_NOTIFICATIONS,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeMyNotifications(data, !nextHref))
    }
  }
}

export const U_MY_NOTIFICATIONS_READ = "U_MY_NOTIFICATIONS_READ"
export const uMyNotificationsRead = (values, params) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyNotificationsShowRead(params)),
    data: getFormData({
      last_seen: _.get(values, 'lastSeen', null)
    })
  })

  return {
    type: U_MY_NOTIFICATIONS_READ,
    request,
    // successCB: (dispatch, data) => {
    //
    // }
  }
}
