import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsAttachmentsIndex, apiMyStartupsAttachmentsShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeMyCampaignAttribute, deleteMyCampaignAttributeEntry } from '../campaigns'

// create
export const C_MY_STARTUP_ATTACHMENT = "C_MY_STARTUP_ATTACHMENT"
export const cMyStartupAttachment = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsAttachmentsIndex(params)),
    data: getFormData({
      title: _.get(values, 'title', null),
      file: _.get(values, 'file[0]', null)
    }, "attachment")
  })

  return {
    type: C_MY_STARTUP_ATTACHMENT,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.attachments', 'Array'))
      notySuccess("Document Added!")
    }
  }
}

// update
export const U_MY_STARTUP_ATTACHMENT = "U_MY_STARTUP_ATTACHMENT"
export const uMyStartupAttachment = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsAttachmentsShow(params)),
    data: getFormData({
      title: _.get(values, 'title', null),
      file: _.get(values, 'file[0]', null)
    }, "attachment")
  })

  return {
    type: U_MY_STARTUP_ATTACHMENT,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeMyCampaignAttribute(data, 'startup.attachments', 'Array'))
      notySuccess("Document Updated!")
    }
  }
}

// delete
export const D_MY_STARTUP_ATTACHMENT = "D_MY_STARTUP_ATTACHMENT"
export const dMyStartupAttachment = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsAttachmentsShow(params))
  })

  return {
    type: `${D_MY_STARTUP_ATTACHMENT}_${params.attachmentID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteMyCampaignAttributeEntry(params.attachmentID, 'startup.attachments'))
      notySuccess("Document Deleted!")
    }
  }
}
