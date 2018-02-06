import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsKPIsIndex, apiMyStartupsKPIsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeMyCampaignAttribute, deleteMyCampaignAttributeEntry } from '../campaigns'

// create
export const C_MY_STARTUP_KPI = "C_MY_STARTUP_KPI"
export const cMyStartupKPI = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsKPIsIndex(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "key_performance_indicator")
  })

  return {
    type: C_MY_STARTUP_KPI,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.key_performance_indicators'))
      notySuccess("KPI Added!")
    }
  }
}

// update
export const U_MY_STARTUP_KPI = "U_MY_STARTUP_KPI"
export const uMyStartupKPI = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsKPIsShow(params)),
    data: getFormData({
      detail: _.get(values, 'detail', null)
    }, "key_performance_indicator")
  })

  return {
    type: U_MY_STARTUP_KPI,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.key_performance_indicators'))
      notySuccess("KPI Updated!")
    }
  }
}

// delete
export const D_MY_STARTUP_KPI = "D_MY_STARTUP_KPI"
export const dMyStartupKPI = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsKPIsShow(params))
  })

  return {
    type: `${D_MY_STARTUP_KPI}_${params.kpiID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteMyCampaignAttributeEntry(params.kpiID, 'startup.key_performance_indicators'))
    }
  }
}
