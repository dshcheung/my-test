import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyInvestorBankDetailIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'

export const SET_MY_INVESTOR_BANK_DETAIL = "SET_MY_INVESTOR_BANK_DETAIL"
export const setMyInvestorBankDetail = (data) => {
  return {
    type: SET_MY_INVESTOR_BANK_DETAIL,
    data
  }
}

export const RESET_MY_INVESTOR_BANK_DETAIL = "RESET_MY_INVESTOR_BANK_DETAIL"
export const resetMyInvestorBankDetail = () => {
  return {
    type: RESET_MY_INVESTOR_BANK_DETAIL
  }
}

export const G_MY_INVESTOR_BANK_DETAIL = "G_MY_INVESTOR_BANK_DETAIL"
export const gMyInvestorBankDetail = ({ queries = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyInvestorBankDetailIndex(), queries)
  })

  return {
    type: G_MY_INVESTOR_BANK_DETAIL,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyInvestorBankDetail(data))
    }
  }
}

export const U_MY_INVESTOR_BANK_DETAIL = "U_MY_INVESTOR_BANK_DETAIL"
export const uMyInvestorBankDetail = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyInvestorBankDetailIndex()),
    data: getFormData(generateParams(values), 'investor_bank_detail')
  })

  return {
    type: U_MY_INVESTOR_BANK_DETAIL,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyInvestorBankDetail(data))
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}

const generateParams = (values) => {
  console.log(values)
  const params = {
    name: _.get(values, "name", null),
    account_number: _.get(values, "account_number", null),
    address: _.get(values, "address", null),
    country: _.get(values, 'country', null)
  }

  return params
}
