import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyInvestorAgreementIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'
import { checkFile } from '../../services/utils'

export const SET_MY_INVESTOR_AGREEMENT = "SET_MY_INVESTOR_AGREEMENT"
export const setMyInvestorAgreement = (data) => {
  return {
    type: SET_MY_INVESTOR_AGREEMENT,
    data
  }
}

export const RESET_MY_INVESTOR_AGREEMENT = "RESET_MY_INVESTOR_AGREEMENT"
export const resetMyInvestorAgreement = () => {
  return {
    type: RESET_MY_INVESTOR_AGREEMENT
  }
}

export const G_MY_INVESTOR_AGREEMENT = "G_MY_INVESTOR_AGREEMENT"
export const gMyInvestorAgreement = ({ queries = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyInvestorAgreementIndex(), queries)
  })

  return {
    type: G_MY_INVESTOR_AGREEMENT,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyInvestorAgreement(data))
    }
  }
}

export const U_MY_INVESTOR_AGREEMENT = "U_MY_INVESTOR_AGREEMENT"
export const uMyInvestorAgreement = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyInvestorAgreementIndex()),
    data: getFormData(generateParams(values), 'investor_agreement')
  })

  return {
    type: U_MY_INVESTOR_AGREEMENT,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyInvestorAgreement(data))
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}

export const D_MY_INVESTOR_AGREEMENT_ATTRIBUTE = "D_MY_INVESTOR_AGREEMENT_ATTRIBUTE"
export const dMyInvestorAgreementAttribute = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyInvestorAgreementIndex()),
    data: getFormData(generateParams(values), 'investor_agreement')
  })

  return {
    type: D_MY_INVESTOR_AGREEMENT_ATTRIBUTE,
    request,
    noScrollTop: true,
    successCB: (dispatch, data) => {
      if (cb) cb(data)
      dispatch(setMyInvestorAgreement(data, true))
      notySuccess("Deleted!")
    }
  }
}

const generateParams = (values) => {
  const attachments = _.get(values, "attachments") || []

  attachments.forEach((el) => {
    checkFile(el, 'file')
  })

  const params = {
    signature: _.get(values, "signature.signature", null),
    investor_agreement_events_attributes: _.get(values, "signature.investor_agreement_events", null),
    attachments_attributes: _.get(values, 'attachments', null)
  }

  return params
}
