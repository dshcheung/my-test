import { genApiUrl, genAxios } from '../../../services/api-request'
import { getFormData } from '../../../services/get-form-data'
import { apiMyStartupsMediaIndex, apiMyStartupsMediaShow } from '../../../services/api-path'
import { notySuccess } from '../../../services/noty'

// create
export const CREATE_MY_STARTUP_MEDIA = "CREATE_MY_STARTUP_MEDIA"
export const createMyStartupMedia = (values, params, cb) => {
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
    type: CREATE_MY_STARTUP_MEDIA,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'media'))
      notySuccess("Media Added!")
    }
  }
}

// update
export const UPDATE_MY_STARTUP_MEDIA = "UPDATE_MY_STARTUP_MEDIA"
export const updateMyStartupMedia = (values, params, cb) => {
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
    type: UPDATE_MY_STARTUP_MEDIA,
    request,
    successCB: () => {
      if (cb) cb()
      // dispatch(mergeCurrentUserAttribute(data, 'media'))
      notySuccess("Media Updated!")
    }
  }
}

// delete
export const DELETE_MY_STARTUP_MEDIA = "DELETE_MY_STARTUP_MEDIA"
export const deleteMyStartupMedia = (params) => {
  const request = genAxios({
    method: "delete",
    url: genApiUrl(apiMyStartupsMediaShow(params))
  })

  return {
    type: `${DELETE_MY_STARTUP_MEDIA}_${params.mediaID}`,
    request,
    successCB: () => {
      // dispatch(deleteCurrentUserAttributeEntry(params.mediaID, 'media'))
    }
  }
}
