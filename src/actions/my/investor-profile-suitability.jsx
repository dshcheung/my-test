import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyProfileSuitabilityIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'

export const SET_MY_PROFILE_SUITABILITY = "SET_MY_PROFILE_SUITABILITY"
export const setMyProfileSuitability = (data, reset) => {
  return {
    type: SET_MY_PROFILE_SUITABILITY,
    data,
    reset
  }
}

export const RESET_MY_PROFILE_SUITABILITY = "RESET_MY_PROFILE_SUITABILITY"
export const resetMyProfileSuitability = () => {
  return {
    type: RESET_MY_PROFILE_SUITABILITY
  }
}

export const G_MY_PROFILE_SUITABILITY = "G_MY_PROFILE_SUITABILITY"
export const gMyProfileSuitability = () => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyProfileSuitabilityIndex())
  })

  return {
    type: G_MY_PROFILE_SUITABILITY,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyProfileSuitability(data))
    }
  }
}

export const U_MY_PROFILE_SUITABILITY = "U_MY_PROFILE_SUITABILITY"
export const uMyProfileSuitability = (values) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyProfileSuitabilityIndex()),
    data: getFormData({
      number_of_dependents: _.get(values, 'numberOfDependents', null),
      employment_status: _.get(values, 'employmentStatus', null),
      occupation: _.get(values, 'occupation', null),
      current_net_income: _.get(values, 'currentNetIncome', null),
      bank_statement: _.get(values, 'bankStatement[0]', null),
      remove_bank_statement: _.get(values, '', null),
      aum: _.get(values, 'aum[0]', null),
      remove_aum: _.get(values, '', null),
      education_level_id: _.get(values, 'educationLevel', null),
      investment_details_attributes: _.get(values, 'investmentDetails', null),
      source_of_funds_attributes: _.get(values, 'sourceOfFunds', null),
    }, "investor_profile_suitability")
  })

  return {
    type: U_MY_PROFILE_SUITABILITY,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyProfileSuitability(data))
      notySuccess("Submitted")
    }
  }
}
