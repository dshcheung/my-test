import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsKPIsIndex, apiMyStartupsKPIsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute, deleteStartupAttributeEntry } from '../../startups'

// create
export const CREATE_MY_STARTUP_KPI = "CREATE_MY_STARTUP_KPI"
export const createMyStartupKPI = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsKPIsIndex(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "key_performance_indicator")
  })

  return {
    type: CREATE_MY_STARTUP_KPI,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'key_performance_indicators'))
      notySuccess("KPI Added!")
    }
  }
}

// update
export const UPDATE_MY_STARTUP_KPI = "UPDATE_MY_STARTUP_KPI"
export const updateMyStartupKPI = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsKPIsShow(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "key_performance_indicator")
  })

  return {
    type: UPDATE_MY_STARTUP_KPI,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'key_performance_indicators'))
      notySuccess("KPI Updated!")
    }
  }
}

// delete
export const DELETE_MY_STARTUP_KPI = "DELETE_MY_STARTUP_KPI"
export const deleteMyStartupKPI = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsKPIsShow(params))
  })

  return {
    type: `${DELETE_MY_STARTUP_KPI}_${params.kpiID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteStartupAttributeEntry(params.kpiID, 'key_performance_indicators'))
    }
  }
}
