import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyDocumentsIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'
import { checkFile } from '../../services/utils'

export const SET_MY_DOCUMENTS = "SET_MY_DOCUMENTS"
export const setMyDocuments = (data) => {
  return {
    type: SET_MY_DOCUMENTS,
    data
  }
}

export const RESET_MY_DOCUMENTS = "RESET_MY_DOCUMENTS"
export const resetMyDocuments = () => {
  return {
    type: RESET_MY_DOCUMENTS
  }
}

export const G_MY_DOCUMENTS = "G_MY_DOCUMENTS"
export const gMyDocuments = () => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyDocumentsIndex(), {})
  })

  return {
    type: G_MY_DOCUMENTS,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyDocuments(data))
    }
  }
}

export const U_MY_DOCUMENTS = "U_MY_DOCUMENTS"
export const uMyDocuments = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyDocumentsIndex()),
    data: getFormData(generateParams(values), 'user')
  })

  return {
    type: U_MY_DOCUMENTS,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyDocuments(data))
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}

export const D_MY_DOCUMENTS_ATTRIBUTE = "D_MY_DOCUMENTS_ATTRIBUTE"
export const dMyDocumentsAttribute = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyDocumentsIndex()),
    data: getFormData(generateParams(values), 'user')
  })

  return {
    type: D_MY_DOCUMENTS_ATTRIBUTE,
    request,
    noScrollTop: true,
    successCB: (dispatch, data) => {
      if (cb) cb(data)
      dispatch(setMyDocuments(data, true))
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
    attachments_attributes: _.get(values, 'attachments', null)
  }

  return params
}
