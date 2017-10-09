import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsMediaIndex, apiMyStartupsMediaShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

import { mergeStartupAttribute, deleteStartupAttributeEntry } from '../../startups'

// create
export const C_MY_STARTUP_MEDIA = "C_MY_STARTUP_MEDIA"
export const cMyStartupMedia = (values, params, cb) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupsMediaIndex(params)),
    data: getFormData({
      title: _.get(values, 'title', null),
      link: _.get(values, 'link', null),
      description: _.get(values, 'description', null),
      banner: _.get(values, 'banner[0]', null)
    }, "medium")
  })

  return {
    type: C_MY_STARTUP_MEDIA,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'media'))
      notySuccess("Media Added!")
    }
  }
}

// update
export const U_MY_STARTUP_MEDIA = "U_MY_STARTUP_MEDIA"
export const uMyStartupMedia = (values, params, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupsMediaShow(params)),
    data: getFormData({
      title: _.get(values, 'title', null),
      link: _.get(values, 'link', null),
      description: _.get(values, 'description', null),
      banner: _.get(values, 'banner[0]', null)
    }, "medium")
  })

  return {
    type: U_MY_STARTUP_MEDIA,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb()
      dispatch(mergeStartupAttribute(data, 'media'))
      notySuccess("Media Updated!")
    }
  }
}

// delete
export const D_MY_STARTUP_MEDIA = "D_MY_STARTUP_MEDIA"
export const dMyStartupMedia = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsMediaShow(params))
  })

  return {
    type: `${D_MY_STARTUP_MEDIA}_${params.mediaID}`,
    request,
    successCB: (dispatch) => {
      dispatch(deleteStartupAttributeEntry(params.mediaID, 'media'))
      notySuccess("Media Deleted!")
    }
  }
}
