import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsKPIsIndex, apiMyStartupsKPIsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create
export const CREATE_MY_STARTUP_KPI = "CREATE_MY_STARTUP_KPI"
export const createMyStartupKPI = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsKPIsIndex(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "kpi")
  })

  return {
    type: CREATE_MY_STARTUP_KPI,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'kpis'))
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
    }, "kpi")
  })

  return {
    type: UPDATE_MY_STARTUP_KPI,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'kpis'))
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
    successCB: () => {
      // dispatch(deleteCurrentUserAttributeEntry(params.kpiID, 'kpis'))
    }
  }
}
